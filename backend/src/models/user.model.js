import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        role: String,
        cart: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.TOKEN_SECRETE_KEY,
        {
            expiresIn: process.env.TOKEN_SECRETE_EXPIRY,
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;

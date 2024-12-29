import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const AddProduct = asyncHandler(async (req, res) => {
    const loggedInAdmin = req.user?._id;

    const user = await User.find({
        _id: {
            $ne: loggedInAdmin,
        },
    }).select("-password");

    res.status(200).json(new ApiResponse(200, user, "All Users"));
});

export const createAdmin = asyncHandler(async (req,res, next) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        throw new ApiError(400, "credentials are missing..");
    }

    if (password.length < 5) {
        throw new ApiError(400, "Password must be at least 6 characters long.");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(400, "User Already Exist");
    }

    const admin = await User.create({
        name,
        email,
        password,
        profilePic: "",
        role: "ADMIN"
    });

    if (!admin) {
        throw new ApiError(500, "Error While creating User");
    }

    res.status(201).json(new ApiResponse(201, admin, "Admin created Successfully"));
})

import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Registration Login

        if (!(name && email && password)) {
            res.status(400).json({ message: "credentials are missing.." });
        }

        if (password.length < 5) {
            res.status(400).json({
                message: "Password must be at least 6 characters long.",
            });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            res.status(400).json({ message: "User Already Exist." });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            res.status(500).json({ message: "Error While creating User" });
        }

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "48h" }, (err, token) => {
            if (err) throw err;

            // Send the user and token in response
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid Credentials" });
        const isMatch = await user.matchPassword(password);

        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "48h" }, (err, token) => {
            if (err) throw err;

            // Send the user and token in response
            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProfile = async (req, res) => {
    res.json(req.user);
};

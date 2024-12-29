import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(400, "username and email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // jwt / cookie
    const token = user.generateToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("jwt", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    token,
                },
                "User Logged In Successdfully."
            )
        );
});

const registerUser = asyncHandler(async (req, res) => {
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

    const user = await User.create({
        name,
        email,
        password,
        profilePic: "",
        role: "GENERAL",
    });

    if (!user) {
        throw new ApiError(500, "Error While creating User");
    }

    res.status(201).json(new ApiResponse(201, user, "User created Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
    };
    res.status(200)
        .clearCookie("jwt", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});

const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.user;

    // const existingUser = await User.findOne(user._id).select("-password");
    // above is handled in the middleware of auth

    res.status(200).json(new ApiResponse(200, user, "User Details"));
});

export { loginUser, registerUser, logoutUser, getUserDetails };

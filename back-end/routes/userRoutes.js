import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new User
// @access Public
router.route("/register").post(registerUser);

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.route("/login").post(loginUser);

// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.route("/profile").get(protect, getProfile);

export default router;

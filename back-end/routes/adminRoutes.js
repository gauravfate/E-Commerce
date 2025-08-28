import express from "express";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import { addUser, allUsers, deleteUser, updateUser } from "../controllers/admin.controller.js";

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (Admin Only)
// @access Private/Admin
router.route("/").get(protect, isAdmin, allUsers);

// @route POST /api/admin/users
// @desc Add new user (Admin Only)
// @access Private/Admin
router.route("/").post(protect, isAdmin, addUser);

// @route PUT /api/admin/users/:id
// @desc Update User info (admin only) - Name, Email and Role
// @access Private/Admin
router.route("/:id").put(protect, isAdmin, updateUser)

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.route("/:id").delete(protect, isAdmin, deleteUser)

export default router;

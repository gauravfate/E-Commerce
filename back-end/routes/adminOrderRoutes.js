import express from "express";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import { allOrders, deleteOrder, updateOrderStatus } from "../controllers/adminOrders.controller.js";

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all order (admin only)
// @access Private/Admin
router.route("/").get(protect, isAdmin, allOrders);

// @route PUT /api/admin/orders/:id
// desc Update Order Status
// @access Private/Admin
router.route("/:id").put(protect, isAdmin, updateOrderStatus);

// @route DELETE /api/admin/orders/:id
// @desc Delete an Order
// @access Private/Admin
router.route("/:id").delete(protect, isAdmin, deleteOrder);

export default router;

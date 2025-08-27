import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMyOrder, orderDetails } from "../controllers/order.controller.js";

const router = express.Router();

// @router GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.route("/my-orders").get(protect, getMyOrder);

// @router GET /api/orders/:id
// @desc Get order details by ID
// @access Private
router.route("/:id").get(protect, orderDetails);

export default router;

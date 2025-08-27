import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createCheckout,
    finalizeCheckout,
    payCheckout,
} from "../controllers/checkout.contoller.js";

const router = express.Router();

// @route POST /api/checkout
// desc Create a new checkout session
// @access Private
router.route("/").post(protect, createCheckout);

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.route("/:id/pay").put(protect, payCheckout);

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.route("/:id/finalize").post(protect, finalizeCheckout);

export default router;

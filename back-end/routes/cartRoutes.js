import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    addToCart,
    deleteFromCart,
    mergeCart,
    updateCart,
    userCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// @route POST /api/cart
// @desc Add a product to cart for a guest or logged in user
// @access Public
router.route("/").post(addToCart);

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in-user
// @access Public
router.route("/").put(updateCart);

// @route DELETE /api/cart
// @route Remove a product from cart
// @acces Public
router.route("/").delete(deleteFromCart);

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.route("/").get(userCart);

// @route POST /api/cart/merge
// @desc Merge guest cart into user on login
// @access Private
router.route("/merge").post(protect, mergeCart);

export default router;

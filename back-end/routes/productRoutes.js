import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    bestSeller,
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    newArrivals,
    similarProducts,
    updateProduct,
} from "../controllers/product.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.route("/").post(protect, isAdmin, createProduct);

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.route("/:id").put(protect, isAdmin, updateProduct);

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.route("/:id").delete(protect, isAdmin, deleteProduct);

// @route GET /api/products
// @desc Get all products with optimal query filters
// @access Public
router.route("/").get(getProducts);

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.route("/best-seller").get(bestSeller);

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation data
// @access Public
router.route("/new-arrivals").get(newArrivals);

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.route("/:id").get(getProductById);

// @route GET /api/products/similar/:id
// @desc Retrieve similar products on the current product's gender and category
// @access Public
router.route("/similar/:id").get(similarProducts);

export default router;

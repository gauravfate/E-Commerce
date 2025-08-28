import express from "express";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import { getProducts } from "../controllers/adminProduct.controller.js";

const router = express.Router();

// @router GET /api/admin/products
// @desc Get all products (Admin Only)
// @access private/admin
router.route("/").get(protect, isAdmin, getProducts)

export default router;

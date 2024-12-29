import { Router } from "express";
import {
    getAllCategory,
    createCategory,
    deleteCategory,
    updateCategory,
} from "../controllers/category.constrollers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllCategory).post(verifyJWT, createCategory);

router.route("/:id").delete(verifyJWT, deleteCategory).put(verifyJWT, updateCategory);

export default router;

import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";

const router = Router();

router.route("/")
    .get(getProducts)
    .post(createProduct)

router.route("/:id")
    .delete(deleteProduct)
    .put(updateProduct)
    .get(getProduct)

export default router;
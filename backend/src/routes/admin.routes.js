import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { AddProduct, createAdmin } from "../controllers/admin.controllers.js";

const router = Router();

router.route("/allUser").get(verifyJWT, AddProduct);
router.route("/register-admin").post(createAdmin);


export default router;

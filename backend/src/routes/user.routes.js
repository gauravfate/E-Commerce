import { Router } from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserDetails,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/get-user").get(verifyJWT, getUserDetails);

export default router;
import express from "express";
import { subscriber } from "../controllers/subscriber.contoller.js";

const router = express.Router();

// @route POST /api/subscribe
// @desc Handle newslatter subscription
// @access Public
router.route("/subscribe").post(subscriber);

export default router;

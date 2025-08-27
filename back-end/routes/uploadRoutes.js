import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import protect from "../middleware/authMiddleware.js";

import "dotenv/config.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// multer setup using memmory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/").post(protect, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No File Uploaded" });
        }

        // Function To handle the stream upload to clodinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "E-Commerce Products",
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                // Use Stremifier to convert file buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // call the streamUpload function
        const result = await streamUpload(req.file.buffer);

        // Respond with uploaded secure url
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";

const router = Router();

router.route("/")
.get(getProducts)
.post(upload.array('files',5),createProduct)

router.route("/testing")
.post(upload.single("file"), async(req, res, next) => {
    try {
        console.log("req.file___",req.file);
        console.log("req.files____",req.files);

        if (!req.files) {
            return res.status(400).json({ msg: "No file to upload." });
        }

        const imagesUrls = [];

        // for(const file of req.files) {
        //     const uploadR = await uploadOnCloudinary(file.buffer);
        //     if(uploadR){
        //         console.log("uploadR--->>",uploadR);
        //         // imagesUrls.push(uploadR.secure_url)
        //     }
        // }

        res.json({ msg: "File uploaded successfully!", file: req.file });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred during upload." });
    }
})

router.route("/:id")
.delete(deleteProduct)
.put(updateProduct)

export default router;
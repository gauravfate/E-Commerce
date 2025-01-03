import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({ msg: "No file were uploaded" });
        // console.log("/upload : ",req.files);

        const files = req.files.file;
        const {name} = req.body;

        console.log(name);
        if(!name) {
            res.send("No Body");
        }
        // If multiple files are uploaded, `files` will be an array
        if (Array.isArray(files)) {
            const productDetails = (
                await Promise.all(
                    files.map(async (file) => {
                        try {
                            const upload = await uploadToCloudinary(file.tempFilePath);

                            return { public_id: upload.public_id, url: upload.secure_url };
                        } catch (error) {
                            console.log("Failed to upload file: ", file.name, error);
                            return null;
                        }
                    })
                )
            );

            // console.log(productDetails);
            
            if (productDetails.length == 0) {
                throw new ApiError(400, "Failed To Upload Product Images");
            }
            
            res.status(201).json(
                new ApiResponse(201, productDetails, "Images Uploaded Successfully.")
            );

        }
        // If only a single file was uploaded, process it directly
        else {
            const response = await uploadToCloudinary(files.tempFilePath);
            console.log("single file");
        }

        res.send("done testing");
    })
);

export default router;

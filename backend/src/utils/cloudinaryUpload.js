import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv"
import fs from "fs"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(fileBuffer) {
    try {
        if (!fileBuffer) return null;

        // Return a new Promise to handle the async behavior of upload_stream
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image", // Specify that only image files are allowed
                    allowed_formats: ["jpg", "png"], // Restrict to jpeg and png formats
                },
                (error, result) => {
                    if (error) {
                        return reject(new ApiError(500, "Upload to Cloudinary failed"));
                    }
                    resolve(result);
                }
            );

            stream.end(fileBuffer); // End the stream with the file buffer
        });
    } catch (error) {
        console.error("Error in uploadOnCloudinary:", error);
        return null; // You might want to handle this differently based on your needs
    }
}

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            allowed_formats: ["jpg","png"]
        })

        console.log("File Uploaded");
        return response;

    } catch (error) {
        console.log("Error While uploading to cloudinary", error);
        fs.unlink(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary, uploadToCloudinary };

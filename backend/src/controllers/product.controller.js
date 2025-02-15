import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary, uploadToCloudinary } from "../utils/cloudinaryUpload.js";

class ApiFeatures {
    constructor(query, queryString) {
        (this.query = query), (this.queryString = queryString);
    }

    filtering() {
        const queryObj = { ...this.queryString };
        // console.log(queryObj);

        const excludedFields = ["page", "limit", "sort"];

        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match);

        console.log("Query String: ", queryStr);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");

            this.query = this.query.sort(sortBy);

            // console.log(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1; // multiply 1 to convert string to number

        const limit = this.queryString.limit * 1 || 9;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

const getProducts = asyncHandler(async (req, res) => {
    // console.log(req.query);

    const features = new ApiFeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
    const allProducts = await features.query;

    res.status(200).json(new ApiResponse(200, allProducts, "All Products"));
});

const createProduct = asyncHandler(async (req, res) => {
    const { product_id, title, price, description, content, category } = req.body;
    const photos = req.files.file;

    if (!photos) {
        throw new ApiError(400, "Provide Images");
    }

    const product = await Product.findOne({ product_id });

    if (product) {
        throw new ApiError(400, "Product Already Exists");
    }

    // // one way to upload
    // const productSecureUrls = [];
    // for(const file of req.files) {
    //     const upload = await uploadOnCloudinary(file.buffer);

    //     if(upload) {
    //         productSecureUrls.push(upload.secure_url);
    //     }
    // }

    // one way to upload
    // const productSecureUrls = (
    //     await Promise.all(
    //         req.files.map(async (file) => {
    //             try {
    //                 const upload = await uploadOnCloudinary(file.buffer);
    //                 console.log(file.buffer);

    //                 return upload.secure_url;
    //             } catch (error) {
    //                 console.error("Failed to upload file:", file.originalname, error);
    //                 return null;
    //             }
    //         })
    //     )
    // ).filter((url) => url !== null);

    let productSecureUrls;
    if (Array.isArray(photos)) {
        productSecureUrls = (
            await Promise.all(
                photos.map(async (file) => {
                    try {
                        const upload = await uploadToCloudinary(file.tempFilePath);

                        return upload.secure_url;
                    } catch (error) {
                        console.log("Failed to upload file: ", file.name, error);
                        return null;
                    }
                })
            )
        ).filter((url) => url !== null);
    }
    // If only a single file was uploaded, process it directly
    else {
        productSecureUrls = await uploadToCloudinary(files.tempFilePath);
        console.log("single file");
    }

    // console.log("Product Urls :: ",productSecureUrls);

    if (productSecureUrls.length == 0) {
        throw new ApiError(400, "Failed To Upload Product Images");
    }

    const newProduct = await Product.create({
        product_id,
        title,
        price,
        description,
        content,
        images: productSecureUrls,
        category,
    });

    if (!newProduct) {
        throw new ApiError(500, "Error While Creating the Product");
    }

    res.status(201).json(
        new ApiResponse(201, newProduct, "Product Create Successfully.")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        throw new ApiError(500, "Error While Deleting The Product");
    }

    res.status(200).json(new ApiResponse(200, {}, "Product Deleted"));
});

const updateProduct = asyncHandler(async (req, res) => {
    // Filter out fields that are undefined or null
    const updates = Object.keys(req.body).reduce((acc, key) => {
        if (req.body[key] !== undefined && req.body[key] !== null) {
            acc[key] = req.body[key];
        }
        return acc;
    }, {});

    // Check if there are any fields to update
    if (Object.keys(updates).length === 0) {
        res.status(400);
        throw new Error("No fields to update");
    }

    const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        { new: true } // Return the updated document
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
        throw new ApiError(404, "Product Not Found");
    }

    res.status(200).json(
        new ApiResponse(200, updateProduct, "Product Updated Successfully")
    );
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product Not Found");
    }

    res.status(200).json(new ApiResponse(200, product, "Product With ID"));
});

export { getProducts, createProduct, deleteProduct, updateProduct, getProduct };

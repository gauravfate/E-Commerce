import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllCategory = asyncHandler(async (req, res, next) => {
    const allCategory = await Category.find();

    res.status(200).json(new ApiResponse(200, allCategory, "All Categories"));
});

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await Category.findOne({ name });
    if (category) {
        throw new ApiError(400, "Category Already Exist");
    }

    const newCategory = await Category.create({ name });

    res.status(200).json(
        new ApiResponse(200, newCategory, "Category Create Successfully")
    );
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        throw new ApiError(400, "Category Not Found");
    }

    res.status(200).json(new ApiResponse(200, {}, "Category Deleted!"));
});

export const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id, // Directly pass the ID as a string
        { name },      // The update object
        { new: true }  // Optional: to return the updated document
    );
    
    if (!updateCategory) {
        throw new ApiError(400, "Category Not Found");
    }

    res.status(200).json(new ApiResponse(200, updatedCategory, "Updated Successfully"));
});

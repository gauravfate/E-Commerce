import mongoose from "mongoose";
import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const createdProduct = await Product.create({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user?._id, // Assuming authentication middleware sets this
        });

        if (!createProduct) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        // Find Product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product fields if provided
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.discountPrice = discountPrice ?? product.discountPrice;
        product.countInStock = countInStock ?? product.countInStock;
        product.category = category ?? product.category;
        product.brand = brand ?? product.brand;
        product.sizes = sizes ?? product.sizes;
        product.colors = colors ?? product.colors;
        product.collections = collections ?? product.collections;
        product.material = material ?? product.material;
        product.gender = gender ?? product.gender;
        product.images = images ?? product.images;
        product.isFeatured = isFeatured ?? product.isFeatured;
        product.isPublished = isPublished ?? product.isPublished;
        product.tags = tags ?? product.tags;
        product.dimensions = dimensions ?? product.dimensions;
        product.weight = weight ?? product.weight;
        product.sku = sku ?? product.sku;

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit,
        } = req.query;

        let query = {};

        // Filter logic
        if (collection && collection.toLocaleLowerCase() != "all") {
            query.collection = collection;
        }
        if (category && category.toLocaleLowerCase() != "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Sorting Logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Featch Products and apply sorting and limit
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const getProductById = async (req, res) => {
    const id = req.params?.id;

    // ✅ Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const similarProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        const similarProduct = await Product.find({
            _id: { $ne: product._id }, // Exclude the current product id
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.status(200).json(similarProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const bestSeller = async (req, res) => {
    try {
        const bestSell = await Product.findOne().sort({ rating: -1 });
        if (bestSell) {
            res.status(200).json(bestSell);
        } else {
            res.status(404).json({ message: "No best seller found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

export const newArrivals = async (req, res) => {
    try {
        // Featch Latest 8 products
        const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrival);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

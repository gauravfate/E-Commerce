import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/product.js";
import User from "./models/user.js";
import products from "./data/products.js";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected for seeding..."))
.catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
});

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        // Create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456", // consider hashing this in a real app
            role: "admin",
        });

        // Assign the default user ID to each product
        const userId = createdUser._id;

        const sampleProducts = products.map((item) => {
            return { ...item, user: userId }; // ✅ 'user' field matches your schema
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding the data:", error);
        process.exit(1);
    }
};

seedData();

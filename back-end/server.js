import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";

const app = express();

app.use(cors());

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("WELCOME TO ECCOME API");
});

// routes Import
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`);
    });
});

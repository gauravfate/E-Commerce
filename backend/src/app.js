import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload'
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173/",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    tempFileDir: "./tmp",
    useTempFiles: true
}))

app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));


// routes import
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import category from "./routes/category.routes.js";
import product from "./routes/product.routes.js";
import upload from "./routes/upload.route.js"

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", category);
app.use("/api/v1/upload" , upload)
app.use("/api/v1/product", product);

app.get("/", (req,res)=> {
    res.sendFile("/public/index.html");
})

export default app;

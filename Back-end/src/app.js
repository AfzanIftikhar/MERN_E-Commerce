import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// For auth
app.use("/api/auth", authRoute);

// For Products
app.use("/api/products", productRouter);

export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import categotyRoutes from "./routes/categoryRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});

app.use(limiter);

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use("/api/auth", authRoutes);
app.use("/api/profile",userRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/home",homeRoutes);
app.use("/api/category",categotyRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

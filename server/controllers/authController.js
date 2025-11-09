import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import logger from "../logs/winstonLog.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashed }
        });

        res.status(200).json({ message: "Regiration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some thing went wrong" });
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    logger.info('Home route accessed');

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const valid = bcrypt.compare(password, user.password);

        if (!valid) return res.status(401).json({ message: "Invalid credentials" });
        console.log(user);
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some thing went wrong" });
    }
}   
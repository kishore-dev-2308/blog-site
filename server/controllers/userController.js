import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import logger from "../logs/winstonLog.js";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import { deletefile } from "../utils/fileHandeler.js";

dotenv.config();
const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await prisma.user.findFirst({
            where: { id },
            select: { id: true, name: true, email: true, role: true, password: false, profileImage: true }
        });

        if (!user) {
            logger.warn(`User not found for email: ${decoded.email}`);
            return res.status(404).json({ message: "User not found" });
        }

        logger.info(`Profile fetched for ${user.email}`);
        return res.status(200).json({ user });
    } catch (error) {
        logger.error(`Profile fetch failed: ${error.message}`);
        return res.status(401).json({ message: "User Not Found" });
    }
}

export const updateProfile = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name } = req.body;
        const { id } = req.user;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { profileImage: true },
        });

        let newProfileImage;
        if (req.file) {
            newProfileImage = `/uploads/${req.file.filename}`;

            if (user?.profileImage) {
                const oldImagePath = path.resolve(
                    user.profileImage.replace(/^\//, "")
                );

                logger.info(`Attempting to delete old image: ${oldImagePath}`);

                if (!deletefile(oldImagePath)) {
                    res.status(500).json({ message: "Unable to delete old profile" });
                }
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                name,
                ...(newProfileImage && { profileImage: newProfileImage }),
            },
            select: { id: true, name: true, email: true, profileImage: true },
        });

        logger.info(`User ${id} updated profile`);
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });


    } catch (error) {
        logger.error(`Profile fetch failed: ${error.message}`);
        return res.status(401).json({ message: "Something went wrong" });
    }
}
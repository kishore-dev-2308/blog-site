import logger from "../logs/winstonLog.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const allBolgs = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const skip = (Number(page) - 1) * Number(limit);

        let where = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
            ];
        }

        const [blogs, total] = await Promise.all([
            prisma.blog.findMany({
                where,
                include: {
                    author: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: Number(limit),
            }),
            prisma.blog.count({ where }),
        ]);

        res.json({
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            blogs,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
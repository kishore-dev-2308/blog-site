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
                    category: {
                        select: { name: true }
                    }
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

export const getBySlug = async (req, res) => {

    try {
        const slug = req.params.slug
        let blog = await prisma.blog.findFirst({
            where: {
                slug
            },
            include: {
                author: {
                    select: { name: true },
                },
                category: {
                    select: { name: true }
                }
            }
        });

        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
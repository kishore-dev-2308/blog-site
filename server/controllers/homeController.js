import logger from "../logs/winstonLog.js";
import { PrismaClient } from "@prisma/client";
import { createTransporter } from "../utils/mailer.js";
import { authorRequestTemplate } from "../mails/templates/authorRequestTemplate.js";

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

export const latestBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true
            },
            include: {
                author: {
                    select: { name: true },
                },
                category: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        });
        res.json({ blogs });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getBlogByCategory = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", category } = req.query;

        const skip = (Number(page) - 1) * Number(limit);

        let where = {};
        where.isPublished = true;
        if (category) {
            where.categoryId = category;
        }

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
                        select: { name: true },
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

export const userAuthorRequest = async (req, res) => {
    try {
        const { userId } = req.user;
        const { reason } = req.body;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role === 2) {
            return res.status(400).json({ message: "Already in author role" });
        }

        const existingRequest = await prisma.authorRequest.findFirst({
            where: {
                userId: userId,
                status: "PENDING",
            },
        });

        if (existingRequest) {
            return res.status(400).json({ message: "An author request is already pending" });
        }

        await prisma.authorRequest.create({
            data: {
                userId: userId,
                reason,
                status: "PENDING",
            },
        });

        try {
            const transporter = createTransporter();

            await transporter.sendMail({
                from: `"Techstream" <${process.env.EMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL || 'techstream2026@gmail.com',
                subject: "User Author Request",
                html: authorRequestTemplate({
                    name: user.name,
                    email: user.email,
                    reason,
                    reviewLink: `${process.env.CLIENT_URL}/admin/users`,
                }),
            });
        } catch (error) {
            console.error("Error sending author request email:", error);
        }

        res.status(200).json({ message: "Author request submitted successfully" });
    } catch (error) {
        logger.error(`Author request failed: ${error.message}`);
        return res.status(500).json({ message: "Unable to process author request" });
    }
}

export const getFeaturedBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                isPublished: true,
                isFeatured: true
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
        res.json({ blog });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
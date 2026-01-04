import { validationResult } from "express-validator";
import logger from "../logs/winstonLog.js";
import { PrismaClient } from "@prisma/client";
import { deletefile } from "../utils/fileHandeler.js";
import { generateUniqueSlug } from "../utils/generateSlug.js";

const prisma = new PrismaClient();

export const storeBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            deletefile(`uploads/${req.file.filename}`);
        }
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let userId = req.user.userId;
        let { title, content, categoryId } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : "";
        const slug = await generateUniqueSlug(title);

        // if (typeof content === "string") {
        //     content = JSON.parse(content);
        // }
        const result = await prisma.$transaction(async (tx) => {
            if (req.user.role === 3) {
                await tx.user.update({
                    where: { id: req.user.id },
                    data: { role: 2 },
                });
            }


            const blog = tx.blog.create({
                data: {
                    title,
                    slug,
                    categoryId,
                    content,
                    coverImage,
                    authorId: userId,
                    isPublished: true,
                }
            });

            logger.info(`Blog created by user ${userId} with ID ${blog.id}`);
            return blog;
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog: result,
        });


    } catch (error) {
        logger.error(error);
        if (req.file) {
            deletefile(`uploads/${req.file.filename}`);
        }
        res.status(500).json({ message: "Some thing went wrong" });
    }
}

export const editBlog = async (req, res) => {

    try {
        const userId = req.user.id;
        const blogId = req.params.id
        let blog = {};

        if (req.user.role === 2) {
            blog = await prisma.blog.findFirst({
                where: {
                    authorId: userId
                },
                where: {
                    id: blogId
                },
                select: {
                    title: true,
                    content: true,
                    coverImage: true,
                    authorId: true,
                    categoryId: true,
                    isPublished: true,
                    category: true
                }
            });
        }
        else if (req.user.role === 1) {
            blog = await prisma.blog.findFirst({
                where: {
                    id: blogId
                },
                select: {
                    title: true,
                    content: true,
                    categoryId: true,
                    coverImage: true,
                    authorId: true,
                    isPublished: true,
                    category: true
                }
            });
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }

        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ 'data': blog });

    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            deletefile(`uploads/${req.file.filename}`);
        }
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.user.id;
        const blogId = req.params.id
        let { title, content, categoryId, isPublished } = req.body;
        let blog = {};
        if (req.user.role === 2) {
            blog = await prisma.blog.findFirst({
                where: {
                    authorId: userId
                },
                where: {
                    id: blogId
                },
                select: {
                    title: true,
                    content: true,
                    coverImage: true,
                    authorId: true,
                    categoryId: true,
                }
            });
        }
        else if (req.user.role === 1) {
            blog = await prisma.blog.findFirst({
                where: {
                    authorId: userId
                },
                select: {
                    title: true,
                    content: true,
                    coverImage: true,
                    authorId: true,
                    categoryId: true,
                }
            });
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }

        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }
        const coverImage = req.file ? `/uploads/${req.file.filename}` : blog.coverImage;
        const slug = await generateUniqueSlug(title, blogId);

        // if (typeof content === "string") {
        //     content = JSON.parse(content);
        // }
        const result = await prisma.$transaction(async (tx) => {

            const blog = tx.blog.update({
                where: {
                    id: blogId
                },
                data: {
                    title,
                    slug,
                    content,
                    categoryId,
                    coverImage,
                    isPublished : isPublished === "1" || isPublished === 1 ? true : false,
                    authorId: userId,
                }
            });

            logger.info(`Blog created by user ${userId} with ID ${blog.id}`);
            return blog;
        });

        res.status(201).json({
            message: "Blog updated successfully",
            blog: result,
        });

    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const listBlog = async (req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 10, search = "" } = req.query;

        const skip = (Number(page) - 1) * Number(limit);

        let where = {};

        if (user.role === 2) {
            where.authorId = user.id;
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

export const recentBlogs = async (req, res) => {
    try {
        const user = req.user;

        let where = {};

        if (user.role === 2) {
            where.authorId = user.id;
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
                take: 5,
            }),
            prisma.blog.count({ where }),
        ]);

        res.json({
            blogs,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export const publishBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: { isPublished: true },
        });
        res.status(200).json({ message: "Blog published successfully", blog: updatedBlog });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const unPublishBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: { isPublished: false },
        });
        res.status(200).json({ message: "Blog unpublished successfully", blog: updatedBlog });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const userId = req.user.id;
        const blogId = req.params.id
        let blog = {};
        if (req.user.role === 2) {
            blog = await prisma.blog.findFirst({
                where: {
                    authorId: userId
                },
                where: {
                    id: blogId
                },
                select: {
                    id: true
                }
            });
        }
        else if (req.user.role === 1) {
            blog = await prisma.blog.findFirst({
                where: {
                    id: blogId
                },
                select: {
                    id: true
                }
            });
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }
        const blogToDelete = await prisma.blog.findUnique({
            where: { id: blogId },
            select: { coverImage: true },
        });
        if (blogToDelete && blogToDelete.coverImage) {
            const imagePath = blogToDelete.coverImage.replace(/^\//, '');
            deletefile(imagePath);
        }
        await prisma.blog.delete({
            where: {
                id: blogId
            }
        });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
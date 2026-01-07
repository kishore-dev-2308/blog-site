import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getDashboardstats = async (req, res) => {

    try {
        const id = req.user.userId;
        const userRole = req.user.role;

        const blogCount = await prisma.blog.count();
        const categoryCount = await prisma.category.count();
        const userCount = await prisma.user.count({
            where: {
                id: { not: id }
            }
        });

        res.status(200).json({
            stats: [
                { label: "Total Blogs", value: blogCount },
                { label: "Total Categories", value: categoryCount },
                { label: "Total Users", value: userCount }
            ]
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ error: error.message });
    }
}
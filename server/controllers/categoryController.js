import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {

    const type = req.query?.type || 0;
    
    const categories = await prisma.category.findMany();

    res.status(200).json(categories);
}
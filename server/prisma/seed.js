import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); async function main() {
    console.log('Seeding database...');

    await prisma.category.createMany({
        data: [
            { name: "Technology" },
            { name: "Design" },
            { name: "AI" },
            { name: "Development" },
            { name: "Health" },
            { name: "Travel" },
            { name: "Science" },
            { name: "Finance" },
            { name: "Lifestyle" },
        ]
    });

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
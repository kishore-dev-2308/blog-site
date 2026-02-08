import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
async function main() {
  console.log("Seeding database...");

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
    ],
  });

  const hashed = await bcrypt.hash("admin123", 10);
  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@techstream.com",
        password: hashed,
        role: 1,
        isVerified: true,
      },
    ],
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

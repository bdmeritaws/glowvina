import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanup() {
  console.log("Cleaning up orphan ProductCategory records...");
  
  try {
    // Delete ProductCategory records where categoryId doesn't exist
    const result = await prisma.$executeRaw`
      DELETE FROM ProductCategory 
      WHERE categoryId NOT IN (SELECT id FROM Category)
    `;
    console.log(`Deleted ${result} orphan ProductCategory records`);
  } catch (error) {
    console.error("Error cleaning up:", error);
  }
  
  await prisma.$disconnect();
}

cleanup();

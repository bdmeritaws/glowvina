import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Cleaning up existing products...");
  
  // Delete in correct order due to foreign keys
  await prisma.productImage.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  
  console.log("✅ All products cleaned up!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding admin user...");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@beaulii.com" },
    update: {},
    create: {
      email: "admin@beaulii.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Admin user created:", admin.email);
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
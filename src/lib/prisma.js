import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, create a new instance or use existing one from global
  if (!globalForPrisma.__prismaClient) {
    globalForPrisma.__prismaClient = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = globalForPrisma.__prismaClient;
  
  // Ensure the client is connected in development
  prisma.$connect().catch(console.error);
}

export { prisma };

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;

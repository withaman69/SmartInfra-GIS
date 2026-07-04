import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const buildings = await prisma.buildings.findMany();

  console.log(buildings);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
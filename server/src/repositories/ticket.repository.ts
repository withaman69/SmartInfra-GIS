import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TicketRepository {
  static async create(data: any) {
    return prisma.ticket.create({
      data,
    });
  }

  static async findAll() {
  return prisma.ticket.findMany({
    include: {
      asset: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

  static async findById(id: string) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        asset: true,
        assignedTo: true,
      },
    });
  }

  static async update(id: string, data: any) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.ticket.delete({
      where: { id },
    });
  }
}
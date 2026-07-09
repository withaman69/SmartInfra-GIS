import { TicketRepository } from "../repositories/ticket.repository";
import { prisma } from "../config/db";
export class TicketService {
  static async createTicket(
    data: any
  ) {
    return TicketRepository.create(
      data
    );
  }

  static async getAllTickets() {
    return TicketRepository.findAll();
  }

  static async getTicketById(
    id: string
  ) {
    return TicketRepository.findById(
      id
    );
  }

  static async updateTicket(
    id: string,
    data: any
  ) {
    return TicketRepository.update(
      id,
      data
    );
  }

  static async deleteTicket(
    id: string
  ) {
    return TicketRepository.delete(
      id
    );
  }
  static async getStats() {
  const total =
    await prisma.ticket.count();

  const open =
    await prisma.ticket.count({
      where: {
        status: "OPEN",
      },
    });

  const inProgress =
    await prisma.ticket.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

  const resolved =
    await prisma.ticket.count({
      where: {
        status: "RESOLVED",
      },
    });

  return {
    total,
    open,
    inProgress,
    resolved,
  };
}
static async getCharts() {
  const statusData =
    await prisma.ticket.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

  const priorityData =
    await prisma.ticket.groupBy({
      by: ["priority"],
      _count: {
        priority: true,
      },
    });

  return {
    statusData:
      statusData.map(
        (item) => ({
          status:
            item.status,
          count:
            item._count
              .status,
        })
      ),

    priorityData:
      priorityData.map(
        (item) => ({
          priority:
            item.priority,
          count:
            item._count
              .priority,
        })
      ),
  };
}
}

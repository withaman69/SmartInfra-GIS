import { TicketRepository } from "../repositories/ticket.repository";
import { prisma } from "../config/db";
import { NotificationService }
from "./notification.service";
export class TicketService {
  static async createTicket(
  data: any
) {
  const ticket =
    await TicketRepository.create(
      data
    );

  if (data.createdById) {
    await NotificationService.create(
      data.createdById,
      "Ticket Created",
      `Ticket "${ticket.title}" was created successfully`
    );
  }

  return ticket;
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
  const ticket =
    await TicketRepository.update(
      id,
      data
    );

  if (
    data.status === "RESOLVED"
  ) {
    const asset =
      await prisma.asset.findUnique({
        where: {
          id: ticket.assetId,
        },
      });

    if (asset) {
      await prisma.asset.update({
        where: {
          id: asset.id,
        },
        data: {
          healthScore: Math.min(
            asset.healthScore + 10,
            100
          ),
        },
      });
    }
  }

  if (
    data.status === "OPEN"
  ) {
    const asset =
      await prisma.asset.findUnique({
        where: {
          id: ticket.assetId,
        },
      });

    if (asset) {
      await prisma.asset.update({
        where: {
          id: asset.id,
        },
        data: {
          healthScore: Math.max(
            asset.healthScore - 10,
            0
          ),
        },
      });
    }
  }

  return ticket;
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

static async getMyTickets(
  engineerId: string
) {
  return prisma.ticket.findMany({
    where: {
      assignedToId: engineerId,
    },
    include: {
      asset: true,
    },
  });
}

static async getByAsset(
  assetId: string
) {
  return prisma.ticket.findMany({
    where: {
      assetId,
    },
    include: {
      asset: true,
      assignedTo: true,
    },
  });
}

static async getAnalytics() {
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

  const high =
    await prisma.ticket.count({
      where: {
        priority: "HIGH",
      },
    });

  const medium =
    await prisma.ticket.count({
      where: {
        priority: "MEDIUM",
      },
    });

  const low =
    await prisma.ticket.count({
      where: {
        priority: "LOW",
      },
    });

  return {
    status: {
      open,
      inProgress,
      resolved,
    },

    priority: {
      high,
      medium,
      low,
    },
  };
}


}

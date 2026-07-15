import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
import { prisma } from "../config/db";
export class TicketController {
  static async create(
    req: Request,
    res: Response
  ) {
    try {
      const ticket =
        await TicketService.createTicket(
          req.body
        );

      res.status(201).json({
        success: true,
        ticket,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create ticket",
      });
    }
  }

  static async getAll(
    req: Request,
    res: Response
  ) {
    const tickets =
      await TicketService.getAllTickets();

    res.json({
      success: true,
      tickets,
    });
  }

  static async getById(
    req: Request,
    res: Response
  ) {
    const ticket =
      await TicketService.getTicketById(
       req.params.id as string
      );

    res.json({
      success: true,
      ticket,
    });
  }

  static async update(
    req: Request,
    res: Response
  ) {
    const ticket =
      await TicketService.updateTicket(
        req.params.id as string,
        req.body
      );

    res.json({
      success: true,
      ticket,
    });
  }

  static async delete(
    req: Request,
    res: Response
  ) {
    await TicketService.deleteTicket(
      req.params.id as string
    );

    res.json({
      success: true,
    });
  }
  static async updateStatus(
  req: Request,
  res: Response
) {
  try {
    const ticket =
      await TicketService.updateTicket(
        req.params.id as string,
        {
          status:
            req.body.status,
        }
      );

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update status",
    });
  }
}
static async assignEngineer(
  req: Request,
  res: Response
) {
  try {
    const ticket =
      await TicketService.updateTicket(
        req.params.id as string,
        {
          assignedToId:
            req.body.assignedToId,
        }
      );

    await prisma.notification.create({
      data: {
        userId:
          req.body.assignedToId,
        title:
          "New Ticket Assigned",
        message: `You have been assigned ticket "${ticket.title}"`,
      },
    });

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to assign engineer",
    });
  }
}
static async stats(
  req: Request,
  res: Response
) {
  try {
    const stats =
      await TicketService.getStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
static async charts(
  req: Request,
  res: Response
) {
  try {
    const charts =
      await TicketService.getCharts();

    res.json({
      success: true,
      ...charts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}

static async myTickets(
  req: Request,
  res: Response
) {
  try {
    const tickets =
      await TicketService.getMyTickets(
        req.user!.userId
      );

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch tickets",
    });
  }
}

static async getByAsset(
  req: Request<{ assetId: string }>,
  res: Response
) {
  try {
    const tickets =
      await TicketService.getByAsset(
        req.params.assetId
      );

    res.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}

static async analytics(
  req: Request,
  res: Response
) {
  try {
    const analytics =
      await TicketService.getAnalytics();

    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
}
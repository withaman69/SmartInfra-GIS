import { Request, Response } from "express";
import { prisma } from "../config/db";

export class ActivityController {
  static async getRecent(
    req: Request,
    res: Response
  ) {
    try {
      const assets =
        await prisma.asset.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        });

      const tickets =
        await prisma.ticket.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        });

      const activities = [
        ...assets.map((asset) => ({
          type: "ASSET",
          title: `Asset Created: ${asset.name}`,
          date: asset.createdAt,
        })),

        ...tickets.map((ticket) => ({
          type: "TICKET",
          title: `Ticket Created: ${ticket.title}`,
          date: ticket.createdAt,
        })),
      ];

      activities.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

      return res.json({
        success: true,
        activities: activities.slice(
          0,
          10
        ),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
      });
    }
  }
}
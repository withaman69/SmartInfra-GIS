import { Request, Response } from "express";
import { prisma } from "../config/db";

export class AuditController {
  static async getAll(
    req: Request,
    res: Response
  ) {
    const logs =
      await prisma.auditLog.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      logs,
    });
  }
  static async getAssetLogs(
  req: Request,
  res: Response
) {
  try {
    const logs =
      await prisma.auditLog.findMany({
        where: {
          entityId: String(req.params.assetId) ,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch asset activity",
    });
  }
}
}
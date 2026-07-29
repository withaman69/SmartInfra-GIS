import { prisma } from "../config/db";

export class MaintenanceRepository {
  static create(data: any) {
    return prisma.maintenanceLog.create({
      data,
    });
  }

  static getByAsset(assetId: string) {
    return prisma.maintenanceLog.findMany({
      where: {
        assetId,
      },
      include: {
        engineer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static delete(id: string) {
    return prisma.maintenanceLog.delete({
      where: { id },
    });
  }
}
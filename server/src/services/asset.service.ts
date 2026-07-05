import { prisma } from "../config/db";

export class AssetService {
  static async create(data: {
    name: string;
    assetType: string;
    description?: string;
    latitude: number;
    longitude: number;
    createdById: string;
  }) {
    return prisma.asset.create({
      data,
    });
  }

  static async getAll() {
    return prisma.asset.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  static async getById(id: string) {
    return prisma.asset.findUnique({
      where: { id },
    });
  }

  static async update(
    id: string,
    data: any
  ) {
    return prisma.asset.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.asset.delete({
      where: { id },
    });
  }
}
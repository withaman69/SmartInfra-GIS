import { prisma } from "../config/db";


import {
  AssetStatus
} from "@prisma/client";

export class AssetService {
static async create(data: {
  name: string;
  assetType: string;
  description?: string;
  status?: AssetStatus;
  latitude: number;
  longitude: number;
  imageUrl?: string;
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
  static async getGeoJson() {
  const assets = await prisma.asset.findMany();

  return {
    type: "FeatureCollection",
    features: assets.map((asset) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          asset.longitude,
          asset.latitude,
        ],
      },
     properties: {
  id: asset.id,
  name: asset.name,
  assetType: asset.assetType,
  status: asset.status,
  imageUrl: asset.imageUrl,
},
    })),
  };
}
static async getStats() {
  const total =
    await prisma.asset.count();

  const active =
    await prisma.asset.count({
      where: {
        status: "ACTIVE",
      },
    });

  const maintenance =
    await prisma.asset.count({
      where: {
        status: "MAINTENANCE",
      },
    });

  return {
    total,
    active,
    maintenance,
  };
}
static async getNearby(
  latitude: number,
  longitude: number,
  radiusKm: number
) {
  const assets =
    await prisma.asset.findMany();

  return assets.filter((asset) => {
    const distance =
      Math.sqrt(
        Math.pow(
          asset.latitude - latitude,
          2
        ) +
        Math.pow(
          asset.longitude - longitude,
          2
        )
      );

    return (
      distance <
      radiusKm / 111
    );
  });
}
static async getGeoJsonByStatus(
  status: string
) {
  const assets =
    await prisma.asset.findMany({
      where: { status: status as any },
    });

  return {
    type: "FeatureCollection",
    features: assets.map(
      (asset) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            asset.longitude,
            asset.latitude,
          ],
        },
       properties: {
  id: asset.id,
  name: asset.name,
  status: asset.status,
  imageUrl: asset.imageUrl,
},
      })
    ),
  };
}
}
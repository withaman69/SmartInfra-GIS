import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";

import cloudinary from "../config/cloudinary";

import { createAuditLog } from "../utils/audit";
export class AssetController {
  static async create(
    req: Request,
    res: Response
  ) {
    try {
      const asset = await AssetService.create({
        ...req.body,
        createdById: req.user!.userId,
      });
     await createAuditLog(
  req.user!.userId,
  "CREATE",
  "ASSET",
  asset.id,
  `Created asset ${asset.name}`
);

      res.status(201).json({
        success: true,
        asset,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAll(
    _req: Request,
    res: Response
  ) {
    try {
      const assets = await AssetService.getAll();

      res.status(200).json({
        success: true,
        assets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const asset = await AssetService.getById(
        req.params.id
      );

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      res.status(200).json({
        success: true,
        asset,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const asset = await AssetService.update(
        req.params.id,
        req.body
      );
      await createAuditLog(
  req.user!.userId,
  "UPDATE",
  "ASSET",
  asset.id,
  `Updated asset ${asset.name}`
);
      res.status(200).json({
        success: true,
        asset,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

static async delete(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const asset =
      await AssetService.getById(
        req.params.id
      );

    await createAuditLog(
      req.user!.userId,
      "DELETE",
      "ASSET",
      req.params.id,
      `Deleted asset ${asset?.name}`
    );

    await AssetService.delete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
  static async geoJson(
  _req: Request,
  res: Response
) {
  try {
    const geoJson =
      await AssetService.getGeoJson();

    res.status(200).json(geoJson);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
static async stats(
  _req: Request,
  res: Response
) {
  const stats =
    await AssetService.getStats();

  res.status(200).json({
    success: true,
    stats,
  });
}
static async nearby(
  req: Request,
  res: Response
) {
  const latitude = Number(
    req.query.latitude
  );

  const longitude = Number(
    req.query.longitude
  );

  const radius = Number(
    req.query.radius
  );

  const assets =
    await AssetService.getNearby(
      latitude,
      longitude,
      radius
    );

  res.status(200).json({
    success: true,
    assets,
  });
}
static async geoJsonByStatus(
  req: Request,
  res: Response
) {
  const status = String(req.params.status);

  const data =
    await AssetService.getGeoJsonByStatus(
      status
    );

  res.status(200).json(data);
}

static async chartData(
  req: Request,
  res: Response
) {
  try {
    const assets =
      await AssetService.getAll();

    const statusData = [
      {
        status: "ACTIVE",
        count: assets.filter(
          (asset) =>
            asset.status ===
            "ACTIVE"
        ).length,
      },
      {
        status: "MAINTENANCE",
        count: assets.filter(
          (asset) =>
            asset.status ===
            "MAINTENANCE"
        ).length,
      },
      {
        status: "INACTIVE",
        count: assets.filter(
          (asset) =>
            asset.status ===
            "INACTIVE"
        ).length,
      },
    ];

    const typeMap = new Map<
      string,
      number
    >();

    assets.forEach((asset) => {
      typeMap.set(
        asset.assetType,
        (typeMap.get(
          asset.assetType
        ) || 0) + 1
      );
    });

    const typeData =
      Array.from(
        typeMap.entries()
      ).map(
        ([assetType, count]) => ({
          assetType,
          count,
        })
      );

    return res.status(200).json({
      success: true,
      statusData,
      typeData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch chart data",
    });
  }
}
static async uploadImage(
  req: Request & {
    file?: Express.Multer.File;
  },
  res: Response
) {
  try {
    if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "No image uploaded",
  });
}
console.log(
  "REQ FILE:",
  req.file
);
const file = req.file;

console.log(
  "File:",
  file.originalname
);

console.log(
  "Size:",
  file.size
);
console.log(
  "Cloud:",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "Cloudinary Config:",
  cloudinary.config()
);

const result =
  await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`,
    {
      folder:
        "smartinfra-assets",
    }
  );

console.log(
  "UPLOAD RESULT:",
  result
);
await createAuditLog(
  req.user!.userId,
  "UPLOAD",
  "ASSET_IMAGE",
  "IMAGE",
  "Uploaded asset image"
);

    return res.json({
      success: true,
      imageUrl:
        result.secure_url,
    });
  }catch (error: any) {
  console.error(
    "FULL ERROR:",
    error
  );

  console.error(
    "ERROR MESSAGE:",
    error?.message
  );

  console.error(
    "HTTP CODE:",
    error?.http_code
  );

  console.error(
    "ERROR RESPONSE:",
    error?.error
  );

  return res.status(500).json({
    success: false,
    message: error?.message || "Upload failed",
    error,
  });
}
}


static async recent(
  req: Request,
  res: Response
) {
  try {
    const assets =
      await AssetService.getRecentAssets();

    res.status(200).json({
      success: true,
      assets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch recent assets",
    });
  }
}

static async healthAnalytics(
  req: Request,
  res: Response
) {
  try {
    const data =
      await AssetService.getHealthAnalytics();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
}

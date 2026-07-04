import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";

export class AssetController {
  static async create(req: Request, res: Response) {
    const asset = await AssetService.create({
      ...req.body,
      createdById: req.user!.userId,
    });

    res.status(201).json({
      success: true,
      asset,
    });
  }

  static async getAll(
    _req: Request,
    res: Response
  ) {
    const assets = await AssetService.getAll();

    res.status(200).json({
      success: true,
      assets,
    });
  }
}
import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";

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
}
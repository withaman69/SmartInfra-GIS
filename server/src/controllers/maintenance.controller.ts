import { Request, Response } from "express";
import { MaintenanceRepository } from "../repositories/maintenance.repository";

export class MaintenanceController {
  static async create(
    req: any,
    res: Response
  ) {
    try {
      const {
        assetId,
        notes,
        cost,
      } = req.body;

      const log =
        await MaintenanceRepository.create({
          assetId,
          engineerId: req.user.userId,
          notes,
          cost,
        });

      res.status(201).json({
        success: true,
        log,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getByAsset(
    req: Request,
    res: Response
  ) {
    try {
      const logs =
        await MaintenanceRepository.getByAsset(
          req.params.assetId as string
        );

      res.json({
        success: true,
        logs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async delete(
    req: Request,
    res: Response
  ) {
    try {
      await MaintenanceRepository.delete(
        req.params.id as string
      );

      res.json({
        success: true,
        message:
          "Maintenance log deleted",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
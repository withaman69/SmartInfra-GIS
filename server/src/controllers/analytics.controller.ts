import { Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service";

export class AnalyticsController {
  static async engineerPerformance(
    req: Request,
    res: Response
  ) {
    try {
      const data =
        await AnalyticsService.engineerPerformance();

      res.json({
        success: true,
        engineers: data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }
}
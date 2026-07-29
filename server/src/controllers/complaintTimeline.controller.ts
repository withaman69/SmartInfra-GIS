import { Request, Response } from "express";
import { ComplaintTimelineRepository } from "../repositories/complaintTimeline.repository";

export class ComplaintTimelineController {
  static async getByComplaint(
    req: Request,
    res: Response
  ) {
    try {
      const timeline =
        await ComplaintTimelineRepository.getByComplaint(
          req.params.complaintId as string
        );

      res.json({
        success: true,
        timeline,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }
}
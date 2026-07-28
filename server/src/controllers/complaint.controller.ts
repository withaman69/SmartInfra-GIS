import { Request, Response }
from "express";

import { ComplaintService }
from "../services/complaint.service";

export class ComplaintController {

  static async create(
    req: Request,
    res: Response
  ) {
    try {

      const complaint =
        await ComplaintService.createComplaint({
          ...req.body,
          createdById:
            req.user!.userId,
        });

      res.status(201).json({
        success: true,
        complaint,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }

  static async getAll(
    req: Request,
    res: Response
  ) {
    try {

      const complaints =
        await ComplaintService.getAllComplaints();

      res.json({
        success: true,
        complaints,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }

  static async getById(
    req: Request,
    res: Response
  ) {
    try {

      const complaint =
        await ComplaintService.getComplaintById(
          req.params.id as string
        );

      res.json({
        success: true,
        complaint,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }

  static async update(
    req: Request,
    res: Response
  ) {
    try {

      const complaint =
        await ComplaintService.updateComplaint(
          req.params.id as string,
          req.body
        );

      res.json({
        success: true,
        complaint,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }

  static async delete(
    req: Request,
    res: Response
  ) {
    try {

      await ComplaintService.deleteComplaint(
        req.params.id as string
      );

      res.json({
        success: true,
      });

    } catch (error: any) {
  console.error(error);

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
  }
  static async stats(
  req: Request,
  res: Response
) {
  try {

    const stats =
      await ComplaintService.getStats();

    res.json({
      success: true,
      stats,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
}
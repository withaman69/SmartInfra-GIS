import { Request, Response }
from "express";

import { ComplaintService }
from "../services/complaint.service";
import { ComplaintTimelineRepository } from "../repositories/complaintTimeline.repository";
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

await ComplaintTimelineRepository.create({
  complaintId: complaint.id,
  status: "OPEN",
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
export const assignEngineer = async (
  req: any,
  res: any
) => {
  try {
    const { id } = req.params;

    const { engineerId } = req.body;

    const complaint =
      await ComplaintService.assignEngineer(
        id,
        engineerId
      );
await ComplaintTimelineRepository.create({
  complaintId: id,
  status: "ASSIGNED",
});
    return res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
};
export const getAssignedComplaints = async (
  req: any,
  res: any
) => {
  try {
    const complaints =
      await ComplaintService.getAssignedComplaints(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
};
export const resolveComplaint = async (
  req: any,
  res: any
) => {
  try {
    const complaint =
      await ComplaintService.resolveComplaint(
        req.params.id
      );
await ComplaintTimelineRepository.create({
  complaintId: req.params.id,
  status: "RESOLVED",
});
    return res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
};
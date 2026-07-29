import { ComplaintRepository }
from "../repositories/complaint.repository";
import { prisma } from "../config/db";
export class ComplaintService {

  static async createComplaint(
    data: any
  ) {
    return ComplaintRepository.create(
      data
    );
  }

  static async getAllComplaints() {
    return ComplaintRepository.findAll();
  }

  static async getComplaintById(
    id: string
  ) {
    return ComplaintRepository.findById(
      id
    );
  }

  static async updateComplaint(
    id: string,
    data: any
  ) {
    return ComplaintRepository.update(
      id,
      data
    );
  }

  static async deleteComplaint(
    id: string
  ) {
    return ComplaintRepository.delete(
      id
    );
  }
  static async getStats() {

  const total =
    await prisma.complaint.count();

  const open =
    await prisma.complaint.count({
      where: {
        status: "OPEN",
      },
    });

  const inProgress =
    await prisma.complaint.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

  const resolved =
    await prisma.complaint.count({
      where: {
        status: "RESOLVED",
      },
    });

  return {
    total,
    open,
    inProgress,
    resolved,
  };
}
static async assignEngineer(
  complaintId: string,
  engineerId: string
) {
  return ComplaintRepository.assignEngineer(
    complaintId,
    engineerId
  );
}
static async getAssignedComplaints(
  engineerId: string
) {
  return ComplaintRepository.getAssignedComplaints(
    engineerId
  );
}
static async resolveComplaint(
  complaintId: string
) {
  return ComplaintRepository.resolveComplaint(
    complaintId
  );
}
}
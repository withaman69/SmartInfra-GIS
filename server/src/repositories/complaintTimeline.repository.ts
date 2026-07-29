import {prisma} from "../config/db";

export class ComplaintTimelineRepository {
  static create(data: any) {
    return prisma.complaintTimeline.create({
      data,
    });
  }

  static getByComplaint(
    complaintId: string
  ) {
    return prisma.complaintTimeline.findMany({
      where: {
        complaintId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
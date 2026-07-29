import { prisma } from "../config/db";

export class ComplaintRepository {
  static async create(data: any) {
    return prisma.complaint.create({
      data,
    });
  }

  static async findAll() {
    return prisma.complaint.findMany({
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async findById(id: string) {
    return prisma.complaint.findUnique({
      where: { id },
      include: {
        createdBy: true,
      },
    });
  }

static async update(
  id: string,
  data: any
) {
  const complaint =
    await prisma.complaint.findUnique({
      where: { id },
    });

  if (!complaint) {
    throw new Error(
      "Complaint not found"
    );
  }

  return prisma.complaint.update({
    where: { id },
    data,
  });
}

  static async delete(id: string) {
    return prisma.complaint.delete({
      where: { id },
    });
  }
  static async assignEngineer(
  complaintId: string,
  engineerId: string
) {
  return prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      assignedToId: engineerId,
      status: "IN_PROGRESS",
    },
  });
}
static async getAssignedComplaints(
  engineerId: string
) {
  return prisma.complaint.findMany({
    where: {
      assignedToId: engineerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
static async resolveComplaint(
  complaintId: string
) {
  return prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      status: "RESOLVED",
    },
  });
}
}
import { prisma } from "../config/db";

export const createAuditLog = async (
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  description: string
) => {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      description,
    },
  });
};
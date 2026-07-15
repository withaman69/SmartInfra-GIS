import { prisma } from "../config/db";

export class NotificationService {
  static async create(
    userId: string,
    title: string,
    message: string
  ) {
    return prisma.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });
  }

  static async getUserNotifications(
    userId: string
  ) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async markAsRead(
    id: string
  ) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }
}
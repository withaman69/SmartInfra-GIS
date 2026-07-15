import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

export class NotificationController {

  static async getMyNotifications(
    req: Request,
    res: Response
  ) {
    try {

      const notifications =
        await NotificationService.getUserNotifications(
          req.user!.userId
        );

      res.json({
        success: true,
        notifications,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }

  static async markRead(
    req: Request,
    res: Response
  ) {
    try {

      const notification =
        await NotificationService.markAsRead(
          req.params.id as string
        );

      res.json({
        success: true,
        notification,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }
}
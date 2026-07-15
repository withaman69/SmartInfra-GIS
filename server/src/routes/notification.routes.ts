import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { NotificationController } from "../controllers/notification.controller";
const router = Router();

router.get(
  "/",
  authenticate,
  NotificationController.getMyNotifications
);

router.patch(
  "/:id/read",
  authenticate,
  NotificationController.markRead
);

export default router;
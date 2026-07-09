import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  TicketController.create
);

router.get(
  "/",
  TicketController.getAll
);
router.get(
  "/stats",
  authenticate,
  TicketController.stats
);

router.get(
  "/charts",
  authenticate,
  TicketController.charts
);

router.get(
  "/:id",
  TicketController.getById
);

router.put(
  "/:id",
  TicketController.update
);

router.delete(
  "/:id",
  TicketController.delete
);

router.patch(
  "/:id/status",
  authenticate,
  TicketController.updateStatus
);
router.patch(
  "/:id/assign",
  authenticate,
  TicketController.assignEngineer
);

export default router;
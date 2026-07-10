import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
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
  TicketController.stats
);

router.get(
  "/charts",
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
  authorize(
    "ADMIN",
    "ENGINEER"
  ),
  TicketController.updateStatus
);
router.patch(
  "/:id/assign",
  authenticate,
  authorize("ADMIN"),
  TicketController.assignEngineer
);

export default router;
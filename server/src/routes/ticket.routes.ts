import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
const router = Router();

router.use(authenticate);

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER",
    "RESEARCHER"
  ),
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
  "/my-tickets",
  authenticate,
  TicketController.myTickets
);
router.get(
  "/asset/:assetId",
  TicketController.getByAsset
);
router.get(
  "/analytics",
  authenticate,
  TicketController.analytics
);
router.get(
  "/:id",
  TicketController.getById
);

router.put(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER"
  ),
  TicketController.update
);


router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
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
import { Router }
from "express";

import { authenticate }
from "../middlewares/auth.middleware";

import { ComplaintController }
from "../controllers/complaint.controller";
import {
  assignEngineer,
} from "../controllers/complaint.controller";
const router = Router();
import {
  getAssignedComplaints,
} from "../controllers/complaint.controller";
import { resolveComplaint } from "../controllers/complaint.controller";
router.post(
  "/",
  authenticate,
  ComplaintController.create
);

router.get(
  "/",
  authenticate,
  ComplaintController.getAll
);
router.get(
  "/stats",
  authenticate,
  ComplaintController.stats
);
router.put(
  "/:id/assign",
  authenticate,
  assignEngineer
);
router.get(
  "/assigned/me",
  authenticate,
  getAssignedComplaints
);
router.put(
  "/:id/resolve",
  authenticate,
  resolveComplaint
);
router.get(
  "/:id",
  authenticate,
  ComplaintController.getById
);

router.put(
  "/:id",
  authenticate,
  ComplaintController.update
);

router.delete(
  "/:id",
  authenticate,
  ComplaintController.delete
);

export default router;
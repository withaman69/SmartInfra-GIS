import { Router } from "express";
import { ComplaintTimelineController } from "../controllers/complaintTimeline.controller";

const router = Router();

router.get(
  "/:complaintId",
  ComplaintTimelineController.getByComplaint
);

export default router;
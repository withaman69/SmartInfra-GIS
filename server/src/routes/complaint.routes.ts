import { Router }
from "express";

import { authenticate }
from "../middlewares/auth.middleware";

import { ComplaintController }
from "../controllers/complaint.controller";

const router = Router();

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
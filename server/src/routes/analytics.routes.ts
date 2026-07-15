import { Router } from "express";

import { authenticate }
from "../middlewares/auth.middleware";

import { authorize }
from "../middlewares/role.middleware";

import { AnalyticsController }
from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/engineers",
  authenticate,
  authorize("ADMIN"),
  AnalyticsController.engineerPerformance
);

export default router;
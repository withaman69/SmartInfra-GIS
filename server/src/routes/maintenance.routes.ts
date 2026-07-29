import { Router } from "express";

import { authenticate }
from "../middlewares/auth.middleware";

import { authorize }
from "../middlewares/role.middleware";

import { MaintenanceController }
from "../controllers/maintenance.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER"
  ),
  MaintenanceController.create
);

router.get(
  "/asset/:assetId",
  authenticate,
  MaintenanceController.getByAsset
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  MaintenanceController.delete
);

export default router;
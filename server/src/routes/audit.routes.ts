import { Router } from "express";
import { AuditController } from "../controllers/audit.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  AuditController.getAll
);

router.get(
  "/asset/:assetId",
  authenticate,
  AuditController.getAssetLogs
);
export default router;
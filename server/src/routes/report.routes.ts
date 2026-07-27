import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { ReportController } from "../controllers/report.controller";

const router = Router();

router.get(
  "/assets",
  authenticate,
  ReportController.assetReport
);
router.get(
  "/assets-csv",
  authenticate,
  ReportController.exportAssetsCSV
);
router.get(
  "/assets-pdf",
  authenticate,
  ReportController.exportAssetsPDF
);
export default router;
import { Router } from "express";
import { AssetController } from "../controllers/asset.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createAssetSchema } from "../validators/asset.validator";
import { authorize } from "../middlewares/role.middleware";
import { upload } from "../middlewares/upload.middleware";

import cloudinary from "../config/cloudinary";

const router = Router();
router.get(
  "/aman-test-999",
  async (_req, res) => {
    try {
      const result =
        await cloudinary.api.ping();

      console.log(
        "PING RESULT:",
        result
      );

      return res.json(
        result
      );
    } catch (error) {
      console.error(
        "PING ERROR:",
        error
      );

      return res
        .status(500)
        .json(error);
    }
  }
);
router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER",
    
  ),
  validate(createAssetSchema),
  AssetController.create
);

router.get(
  "/",
  authenticate,
  AssetController.getAll
);
router.get(
  "/geojson",
  authenticate,
  AssetController.geoJson
);
router.get(
  "/geojson/:status",
  authenticate,
  AssetController.geoJsonByStatus
);
router.get(
  "/charts",
  authenticate,
  AssetController.chartData
);
router.get(
  "/stats",
  authenticate,
  AssetController.stats
);
router.get(
  "/nearby",
  authenticate,
  AssetController.nearby
);

router.get(
  "/recent",
  authenticate,
  AssetController.recent
);
router.get(
  "/health-analytics",
  authenticate,
  AssetController.healthAnalytics
);
router.get(
  "/critical-assets",
  authenticate,
  AssetController.criticalAssets
);
router.get(
  "/:id/health-history",
  authenticate,
  AssetController.healthHistory
);
router.get(
  "/:id",
  authenticate,
  AssetController.getById
);

router.put(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER"
  ),
  AssetController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  AssetController.delete
);

router.post(
  "/upload-image",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER"
  ),
  upload.single("image"),
  AssetController.uploadImage
);
router.get(
  "/cloudinary-test",
  async (_req, res) => {
    try {
      const result =
        await cloudinary.api.ping();

      console.log(
        "Cloudinary Ping:",
        result
      );

      res.json(result);
    } catch (error) {
      console.error(
        "Cloudinary Ping Error:",
        error
      );

      res.status(500).json(error);
    }
  }
);



export default router;
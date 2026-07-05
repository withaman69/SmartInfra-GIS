import { Router } from "express";
import { AssetController } from "../controllers/asset.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createAssetSchema } from "../validators/asset.validator";
import { authorize } from "../middlewares/role.middleware";
const router = Router();

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "ENGINEER"
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
  "/:id",
  authenticate,
  AssetController.getById
);

router.put(
  "/:id",
  authenticate,
  AssetController.update
);

router.delete(
  "/:id",
  authenticate,
  AssetController.delete
);


export default router;
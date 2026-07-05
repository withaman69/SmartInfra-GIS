import { Router } from "express";
import { AssetController } from "../controllers/asset.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
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
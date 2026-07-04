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

export default router;
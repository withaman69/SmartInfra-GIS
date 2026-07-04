import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import assetRoutes from "./routes/asset.routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartInfra GIS API Running",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
export default app;
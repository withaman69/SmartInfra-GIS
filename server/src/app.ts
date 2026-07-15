import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import assetRoutes from "./routes/asset.routes";
import { errorHandler } from "./middlewares/error.middleware";
import ticketRoutes from "./routes/ticket.routes";
import userRoutes from "./routes/user.routes";
import activityRoutes from "./routes/activity.routes";
import auditRoutes from "./routes/audit.routes";
import notificationRoutes
from "./routes/notification.routes";
import analyticsRoutes
from "./routes/analytics.routes";
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
app.use(errorHandler);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/activity",
  activityRoutes
);
app.use("/api/audit", auditRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use(
  "/api/analytics",
  analyticsRoutes
);
export default app;
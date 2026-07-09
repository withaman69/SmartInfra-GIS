import { Router } from "express";
import { prisma } from "../config/db";

const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  res.json({
    success: true,
    users,
  });
});

export default router;
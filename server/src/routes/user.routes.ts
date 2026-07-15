import { Router } from "express";
import { prisma } from "../config/db";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";


const router = Router();
router.use(authenticate);

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  UserController.getAll
);
router.patch(
  "/:id/role",
  authenticate,
  authorize("ADMIN"),
  UserController.updateRole
)
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
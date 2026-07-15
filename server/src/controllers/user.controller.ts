import { Request, Response } from "express";
import { prisma } from "../config/db";

export class UserController {

  static async getAll(
    req: Request,
    res: Response
  ) {
    const users =
      await prisma.user.findMany();

    res.json({
      success: true,
      users,
    });
  }

  static async updateRole(
    req: Request,
    res: Response
  ) {
  const id = req.params.id as string;

    const { role } = req.body;

    const user =
      await prisma.user.update({
        where: { id },
        data: { role },
      });

    res.json({
      success: true,
      user,
    });
  }
}
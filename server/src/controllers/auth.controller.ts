import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export class AuthController {
  static async register(
    req: Request,
    res: Response
  ) {
    try {
      const { name, email, password } = req.body;

      const user = await AuthService.register(
        name,
        email,
        password
      );

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async login(
    req: Request,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(
        email,
        password
      );

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async me(
  req: Request,
  res: Response
) {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}
}
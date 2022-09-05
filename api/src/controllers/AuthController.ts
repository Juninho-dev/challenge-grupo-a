// User controller
import { Request, Response } from "express";
import { AuthRepository } from "../repositories/AuthRepository";
import { validationResult } from "express-validator";
import { User } from "@prisma/client";
import { apiMessage } from "../helpers/error";

export class AuthController {
  async register(req: Request, res: Response) {
    const authRepository = new AuthRepository();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const user: User = await authRepository.register({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    const authRepository = new AuthRepository();

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await authRepository.login({
      email,
      password,
    });

    return res.send(apiMessage(true, 200, "Login successful", user));
  }
}

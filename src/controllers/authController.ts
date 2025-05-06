import { Request, Response, NextFunction } from "express";
import { UserInput } from "../types/user";
import { validateEmail } from "@utils/validator";
import { authService } from "@services/authService";

export const signup = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    validateEmail(req.body.email);
    const newUser = await authService.signup(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.signin(email, password);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const tokens = await authService.refreshToken(token);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    await authService.logout(token);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

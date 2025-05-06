import { TokenPayload } from "../types/auth";
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({
      message: "Authorization header is missing",
    });
    return;
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token has expired" });
      }

      return res
        .status(403)
        .json({ message: err.message || "Invalid or expired token" });
    }

    res.locals.user = user as TokenPayload;
    next();
  });
};

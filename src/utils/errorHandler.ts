import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
}

export function throwError(message: string, statusCode = 400) {
  const error = new Error(message);
  (error as any).statusCode = statusCode;
  throw error;
}

import { Request, Response, NextFunction } from "express";
import { vars } from "../config/dotenv";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-admin-token");
  if (token && token === vars.ADMIN_TOKEN) {
    next();
    return;
  }

  res.status(401).json({ error: "Unauthorized access" });
};

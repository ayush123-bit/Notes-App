// JWT Middleware 
// src/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: any;
}

export const jwtAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid Authorization header" });

    const token = parts[1];
    if(!token) return res.status(401).json({ error: "Token missing" });
    const payload = verifyJwt(token);
    if (!payload) return res.status(401).json({ error: "Invalid or expired token" });

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

// Auth Controller 
// src/controllers/auth.controller.ts
import type { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service.js";
import { validateRequestOtp, validateVerifyOtp } from "../validators/auth.validator.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";


/**
 * Request OTP - user provides email, server sends OTP
 */
export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const errors = validateRequestOtp(email);
    if (errors.length) return res.status(400).json({ errors });

    await AuthService.requestOtp(email);
    res.json({ message: "OTP sent to email (check spam). It will expire in 10 minutes." });
  } catch (err) {
    next(err);
  }
};

/**
 * Verify OTP and return JWT
 */
export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    const errors = validateVerifyOtp(email, otp);
    if (errors.length) return res.status(400).json({ errors });

    const { token, user } = await AuthService.verifyOtpAndGetToken(email, otp);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

/**
 * Google OAuth start handled by passport
 */

/**
 * Google OAuth callback: passport will attach user in req.user
 * We sign a JWT and optionally redirect to frontend with token
 */
export const googleCallback = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return res.status(400).json({ error: "Google authentication failed" });

    const { token } = await AuthService.handleGoogleCallback(user);
    // redirect to frontend with token in query (frontend can read and store)
    const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/google/success?token=${token}`;
    return res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};

/**
 * Get current user info (protected)
 */
export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await AuthService.getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

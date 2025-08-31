// Auth Routes 
// src/routes/auth.routes.ts
import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

// Request OTP for email signup/login
router.post("/otp/request", AuthController.requestOtp);

// Verify OTP and get token
router.post("/otp/verify", AuthController.verifyOtp);

// Google OAuth - start
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth - callback
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/api/auth/google/failure" }), AuthController.googleCallback);

router.get("/google/failure", (req, res) => {
  res.status(400).json({ error: "Google authentication failed" });
});

export default router;

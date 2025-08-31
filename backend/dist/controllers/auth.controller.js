"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.googleCallback = exports.verifyOtp = exports.requestOtp = void 0;
const AuthService = __importStar(require("../services/auth.service.js"));
const auth_validator_js_1 = require("../validators/auth.validator.js");
/**
 * Request OTP - user provides email, server sends OTP
 */
const requestOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const errors = (0, auth_validator_js_1.validateRequestOtp)(email);
        if (errors.length)
            return res.status(400).json({ errors });
        await AuthService.requestOtp(email);
        res.json({ message: "OTP sent to email (check spam). It will expire in 10 minutes." });
    }
    catch (err) {
        next(err);
    }
};
exports.requestOtp = requestOtp;
/**
 * Verify OTP and return JWT
 */
const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const errors = (0, auth_validator_js_1.validateVerifyOtp)(email, otp);
        if (errors.length)
            return res.status(400).json({ errors });
        const { token, user } = await AuthService.verifyOtpAndGetToken(email, otp);
        res.json({ token, user });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyOtp = verifyOtp;
/**
 * Google OAuth start handled by passport
 */
/**
 * Google OAuth callback: passport will attach user in req.user
 * We sign a JWT and optionally redirect to frontend with token
 */
const googleCallback = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(400).json({ error: "Google authentication failed" });
        const { token } = await AuthService.handleGoogleCallback(user);
        // redirect to frontend with token in query (frontend can read and store)
        const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/google/success?token=${token}`;
        return res.redirect(redirectUrl);
    }
    catch (err) {
        next(err);
    }
};
exports.googleCallback = googleCallback;
/**
 * Get current user info (protected)
 */
const me = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const user = await AuthService.getUserById(userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
};
exports.me = me;

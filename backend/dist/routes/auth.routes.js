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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Auth Routes 
// src/routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const AuthController = __importStar(require("../controllers/auth.controller.js"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Request OTP for email signup/login
router.post("/otp/request", AuthController.requestOtp);
// Verify OTP and get token
router.post("/otp/verify", AuthController.verifyOtp);
// Google OAuth - start
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google OAuth - callback
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/api/auth/google/failure" }), AuthController.googleCallback);
router.get("/google/failure", (req, res) => {
    res.status(400).json({ error: "Google authentication failed" });
});
exports.default = router;

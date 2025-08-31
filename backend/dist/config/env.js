"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    PORT: process.env.PORT ?? "5000",
    MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017/notes_app",
    JWT_SECRET: process.env.JWT_SECRET ?? "supersecretjwtkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ??
        "http://localhost:5000/api/auth/google/callback",
    FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
    EMAIL_USER: process.env.EMAIL_USER ?? "",
    EMAIL_PASS: process.env.EMAIL_PASS ?? "",
};
exports.default = env;

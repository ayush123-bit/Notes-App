// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_URL: string;

  EMAIL_USER: string;
  EMAIL_PASS: string;
}

const env: EnvConfig = {
  PORT: process.env.PORT ?? "5000",
  MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017/notes_app",
  JWT_SECRET: process.env.JWT_SECRET ?? "supersecretjwtkey",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALLBACK_URL ??
    "http://localhost:5000/api/auth/google/callback",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",

  EMAIL_USER: process.env.EMAIL_USER ?? "",
  EMAIL_PASS: process.env.EMAIL_PASS ?? "",
};

export default env;

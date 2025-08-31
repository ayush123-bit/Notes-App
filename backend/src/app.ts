// Express App 
// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import passport from "./config/googleAuth.js";

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Basic health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler (last)
app.use(errorHandler);

export default app;

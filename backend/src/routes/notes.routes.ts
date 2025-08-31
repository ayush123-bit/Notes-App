// Notes Routes 
// src/routes/notes.routes.ts
import express from "express";
import * as NotesController from "../controllers/notes.controller.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.use(jwtAuth);

router.get("/", NotesController.listNotes);
router.post("/", NotesController.createNote);
router.delete("/:id", NotesController.deleteNote);

export default router;

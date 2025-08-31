// Notes Controller 
// src/controllers/notes.controller.ts
import type  { Request, Response, NextFunction } from "express";
import * as NotesService from "../services/notes.service.js";
import { validateCreateNote } from "../validators/notes.validator.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;
    const errors = validateCreateNote(title);
    if (errors.length) return res.status(400).json({ errors });

    const note = await NotesService.createNote(userId, title, content);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    await NotesService.deleteNote(userId, id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};

export const listNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const notes = await NotesService.getNotesForUser(userId);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

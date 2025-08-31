// Notes Service 
// src/services/notes.service.ts
import Note from "../models/note.model.js";

export const createNote = async (userId: string, title: string, content?: string) => {
  const note = await Note.create({ user: userId, title, content });
  return note;
};

export const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw new Error("Note not found or not authorized");
  await note.deleteOne(); // <-- fixed here
  return true;
};

export const getNotesForUser = async (userId: string) => {
  return Note.find({ user: userId }).sort({ createdAt: -1 });
};

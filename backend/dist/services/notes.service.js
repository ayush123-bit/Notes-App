"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesForUser = exports.deleteNote = exports.createNote = void 0;
// Notes Service 
// src/services/notes.service.ts
const note_model_js_1 = __importDefault(require("../models/note.model.js"));
const createNote = async (userId, title, content) => {
    const note = await note_model_js_1.default.create({ user: userId, title, content });
    return note;
};
exports.createNote = createNote;
const deleteNote = async (userId, noteId) => {
    const note = await note_model_js_1.default.findOne({ _id: noteId, user: userId });
    if (!note)
        throw new Error("Note not found or not authorized");
    await note.deleteOne(); // <-- fixed here
    return true;
};
exports.deleteNote = deleteNote;
const getNotesForUser = async (userId) => {
    return note_model_js_1.default.find({ user: userId }).sort({ createdAt: -1 });
};
exports.getNotesForUser = getNotesForUser;

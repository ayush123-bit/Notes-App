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
exports.listNotes = exports.deleteNote = exports.createNote = void 0;
const NotesService = __importStar(require("../services/notes.service.js"));
const notes_validator_js_1 = require("../validators/notes.validator.js");
const createNote = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { title, content } = req.body;
        const errors = (0, notes_validator_js_1.validateCreateNote)(title);
        if (errors.length)
            return res.status(400).json({ errors });
        const note = await NotesService.createNote(userId, title, content);
        res.status(201).json(note);
    }
    catch (err) {
        next(err);
    }
};
exports.createNote = createNote;
const deleteNote = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Note ID is required" });
        }
        await NotesService.deleteNote(userId, id);
        res.json({ message: "Note deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteNote = deleteNote;
const listNotes = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const notes = await NotesService.getNotesForUser(userId);
        res.json(notes);
    }
    catch (err) {
        next(err);
    }
};
exports.listNotes = listNotes;

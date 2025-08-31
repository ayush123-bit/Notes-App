"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateNote = void 0;
// Notes Validator 
// src/validators/notes.validator.ts
const validateCreateNote = (title) => {
    const errors = [];
    if (!title)
        errors.push("Title is required");
    else if (typeof title !== "string" || title.trim().length < 1)
        errors.push("Title must be a non-empty string");
    return errors;
};
exports.validateCreateNote = validateCreateNote;

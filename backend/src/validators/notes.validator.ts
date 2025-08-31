// Notes Validator 
// src/validators/notes.validator.ts
export const validateCreateNote = (title: any) => {
  const errors: string[] = [];
  if (!title) errors.push("Title is required");
  else if (typeof title !== "string" || title.trim().length < 1) errors.push("Title must be a non-empty string");
  return errors;
};

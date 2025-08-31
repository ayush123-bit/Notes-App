import api from "../api/axios";
import { INote } from "../types";

export const fetchNotes = async (): Promise<INote[]> => {
  const res = await api.get("/api/notes");
  return res.data;
};

export const createNote = async (title: string, content?: string): Promise<INote> => {
  const res = await api.post("/api/notes", { title, content });
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/api/notes/${id}`);
  return res.data;
};

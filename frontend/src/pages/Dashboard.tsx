import React, { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote as createNoteApi,
  deleteNote as deleteNoteApi,
} from "../services/notesService";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { INote } from "../types";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchNotes();
      setNotes(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.error || err.message || "Failed to fetch notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async (title: string, content?: string) => {
    const newNote = await createNoteApi(title, content);
    setNotes((p) => [newNote, ...p]);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNoteApi(id);
      setNotes((p) => p.filter((n) => n._id !== id));
    } catch (err: any) {
      alert(
        err?.response?.data?.error || err.message || "Failed to delete note"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Wrapper with flexbox */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        
        {/* LEFT: Create note section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="text-lg font-semibold mb-2 text-gray-800">
              Welcome, {auth.user?.name ?? auth.user?.email}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create your notes and access them anytime.
            </p>
            <NoteForm onCreate={handleCreate} />
          </div>
        </div>

       
     {/* RIGHT: Notes list */}
<div className="w-full lg:w-2/3">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
    <div className="text-sm text-gray-500">{notes.length} notes</div>
  </div>

  {loading && (
    <div className="p-4 bg-white rounded-xl shadow text-gray-600">
      Loading notes...
    </div>
  )}

  {error && (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
      {error}
    </div>
  )}

  {/* Notes stack vertically */}
  <div className="flex flex-col gap-4">
    {notes.map((note) => (
      <NoteCard key={note._id} note={note} onDelete={handleDelete} />
    ))}

    {notes.length === 0 && !loading && (
      <div className="p-6 bg-white rounded-xl shadow text-center text-gray-500">
        No notes yet. Create your first note!
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;

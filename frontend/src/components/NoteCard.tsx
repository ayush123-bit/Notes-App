import React from "react";
import { Trash2 } from "lucide-react";
import { INote } from "../types";

interface Props {
  note: INote;
  onDelete: (id?: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, onDelete }) => {
  return (
    <div className="flex items-start justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition">
      {/* Left: Note Title/Content */}
      <div className="flex-1 pr-3">
        <div className="font-medium text-gray-800">{note.title}</div>
        {note.content && (
          <p className="text-sm text-gray-600 mt-1">{note.content}</p>
        )}
      </div>

      {/* Right: Delete button */}
      <button
        onClick={() => onDelete(note._id)}
        className="text-red-500 hover:text-red-700 transition"
        title="Delete note"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default NoteCard;

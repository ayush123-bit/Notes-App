import React, { useState } from "react";

interface Props {
  onCreate: (title: string, content?: string) => Promise<void>;
}

const NoteForm: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      setLoading(true);
      await onCreate(title.trim(), content.trim());
      setTitle("");
      setContent("");
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-lg p-4 shadow-sm w-full lg:max-w-lg mx-auto"
    >
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Note title"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Write something..."
          rows={4}
        />
      </div>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;

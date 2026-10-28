"use client";

import { deleteNote } from "../app/notes/actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteNote}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Delete this note?")) e.preventDefault();
        }}
        className="cursor-pointer rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
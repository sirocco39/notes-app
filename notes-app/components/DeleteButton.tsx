// components/DeleteButton.tsx
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
      >
        Delete
      </button>
    </form>
  );
}
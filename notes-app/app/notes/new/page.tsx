// app/notes/new/page.tsx
import NoteForm from "@/components/NoteForm";
import { createNote } from "../actions";

export default function NewNotePage() {
  return (
    <main>
      <h1>New note</h1>
        <NoteForm action={createNote} submitLabel="Save" />
    </main>
  );
}
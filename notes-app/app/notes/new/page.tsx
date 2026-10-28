import NoteForm from "../../../components/NoteForm";
import { createNote } from "../actions";

export default function NewNotePage() {
  return (
    <main>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">New note</h1>
      <NoteForm action={createNote} submitLabel="Save" />
    </main>
  );
}
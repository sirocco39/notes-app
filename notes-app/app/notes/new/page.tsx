// app/notes/new/page.tsx
import { createNote } from "./actions";

export default function NewNotePage() {
  return (
    <main>
      <h1>New note</h1>
      <form action={createNote}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required maxLength={100} />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={6} maxLength={5000} />

        <button type="submit">Save</button>
      </form>
    </main>
  );
}
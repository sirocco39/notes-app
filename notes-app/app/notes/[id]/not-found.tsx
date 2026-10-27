// app/notes/[id]/not-found.tsx
import Link from "next/link";

export default function NoteNotFound() {
  return (
    <main>
      <h1>Note not found</h1>
      <p>This note doesn&apos;t exist or was deleted.</p>
      <Link href="/notes">← Back to notes</Link>
    </main>
  );
}
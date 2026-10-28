// app/notes/[id]/not-found.tsx
import Link from "next/link";

export default function NoteNotFound() {
  return (
    <main className="rounded-lg border border-dashed border-stone-300 p-8 text-center">
      <h1 className="text-xl font-semibold">Note not found</h1>
      <p className="mt-1 text-sm text-stone-500">
        This note doesn&apos;t exist or was deleted.
      </p>
      <Link
        href="/notes"
        className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
      >
        ← Back to notes
      </Link>
    </main>
  );
}
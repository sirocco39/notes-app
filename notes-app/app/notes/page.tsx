import { Suspense } from "react";
import Link from "next/link";
import NoteCard from "@/components/NoteCard";
import { prisma } from "../../lib/prisma";

async function NoteList() {
  const notes = await prisma.note.findMany({
    orderBy: { updatedAt: "desc" },
  });

  if (notes.length === 0) return <p>No notes yet.</p>;

  return (
    <>
      {notes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`}>
          <NoteCard title={note.title} content={note.content} />
        </Link>
      ))}
    </>
  );
}

export default function NotesPage() {
  return (
    <main>
      <h1>Notes</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <NoteList />
      </Suspense>
    </main>
  );
}
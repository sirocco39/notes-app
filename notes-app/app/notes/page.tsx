// app/notes/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import NoteCard from "../../components/NoteCard";
import { prisma } from "../../lib/prisma";

type SearchParams = Promise<{ q?: string | string[] }>;

export default function NotesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main>
      <h1>Notes</h1>
      <Link href="/notes/new">New note</Link>
      <Suspense fallback={<p>Loading…</p>}>
        <NotesContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function NotesContent({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  // ?q=a&q=b gives an array, so take the first value
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? "";

  const notes = await prisma.note.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <form action="/notes">
        <label htmlFor="q">Search</label>
        <input id="q" name="q" defaultValue={query} />
        <button type="submit">Search</button>
        {query && <Link href="/notes">Clear</Link>}
      </form>

      {notes.length === 0 ? (
        <p>{query ? `No notes match "${query}".` : "No notes yet."}</p>
      ) : (
        notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}`}>
            <NoteCard title={note.title} content={note.content} />
          </Link>
        ))
      )}
    </>
  );
}
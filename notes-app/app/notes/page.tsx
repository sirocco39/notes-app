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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <Link
          href="/notes/new"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          New note
        </Link>
      </div>
      <Suspense fallback={<p className="text-stone-500">Loading…</p>}>
        <NotesContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function NotesContent({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
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
      <form action="/notes" className="mb-6 flex items-center gap-2">
        <label htmlFor="q" className="sr-only">
          Search notes
        </label>
        <input
          id="q"
          name="q"
          defaultValue={query}
          placeholder="Search notes…"
          className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="submit"
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-100"
        >
          Search
        </button>
        {query && (
          <Link href="/notes" className="shrink-0 text-sm text-stone-600 underline">
            Clear
          </Link>
        )}
      </form>

      {notes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-500">
          {query ? `No notes match "${query}".` : "No notes yet."}
        </p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="block">
              <NoteCard title={note.title} content={note.content} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
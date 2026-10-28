import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "../../../components/DeleteButton";
import { prisma } from "../../../lib/prisma";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main>
      <Link href="/notes" className="text-sm text-stone-600 hover:underline">
        ← Back to notes
      </Link>
      <Suspense fallback={<p className="mt-6 text-stone-500">Loading…</p>}>
        <NoteContent params={params} />
      </Suspense>
    </main>
  );
}

async function NoteContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) notFound();

  return (
    <article className="mt-6">
      <h1 className="break-words text-2xl font-bold tracking-tight">
        {note.title}
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Updated {dateFormat.format(note.updatedAt)} · Created{" "}
        {dateFormat.format(note.createdAt)}
      </p>

      {note.content ? (
        <p className="mt-6 whitespace-pre-wrap break-words">{note.content}</p>
      ) : (
        <p className="mt-6 italic text-stone-400">No content.</p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Link
          href={`/notes/${note.id}/edit`}
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-100"
        >
          Edit
        </Link>
        <DeleteButton id={note.id} />
      </div>
    </article>
  );
}
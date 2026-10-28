import { Suspense } from "react";
import { notFound } from "next/navigation";
import NoteForm from "../../../../components/NoteForm";
import { updateNote } from "../../actions";
import { prisma } from "../../../../lib/prisma";

export default function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit note</h1>
      <Suspense fallback={<p className="text-stone-500">Loading…</p>}>
        <EditForm params={params} />
      </Suspense>
    </main>
  );
}

async function EditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) notFound();

  return <NoteForm action={updateNote} note={note} submitLabel="Save changes" />;
}
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
      <h1>Edit note</h1>
      <Suspense fallback={<p>Loading…</p>}>
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
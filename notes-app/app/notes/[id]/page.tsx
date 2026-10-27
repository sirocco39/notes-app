// app/notes/[id]/page.tsx
import { Suspense } from "react";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main>
      <Link href="/notes">← Back</Link>
      <Suspense fallback={<p>Loading…</p>}>
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
    <>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <DeleteButton id={note.id} />
    </>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/lib/fakeNotes";

export default async function NoteDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const note = notes.find((n) => n.id === id);
    if (!note) notFound;

    return (
        <main>
            <Link href={"/notes"}>← Back</Link>
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
        </main>
    )
}
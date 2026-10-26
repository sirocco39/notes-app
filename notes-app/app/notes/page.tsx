import Link from "next/link";
import NoteCard from "@/components/NoteCard";
import { notes } from "@/lib/fakeNotes";

export default function Home() {
  return (
    <main>
      <h1>Notes</h1>
      {
        notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}`}>
            <NoteCard title={note.title} content={note.content}/>
          </Link>
        ) )
      }
    </main>
  );
}
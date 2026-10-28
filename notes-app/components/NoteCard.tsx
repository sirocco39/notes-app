type NoteCardProps = { title: string; content: string };

export default function NoteCard({ title, content }: NoteCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-stone-300 hover:shadow">
      <h2 className="truncate text-base font-semibold">{title}</h2>
      {content && (
        <p className="mt-1 line-clamp-2 text-sm text-stone-600">{content}</p>
      )}
    </article>
  );
}
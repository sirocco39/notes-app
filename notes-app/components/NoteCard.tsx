// components/NoteCard.tsx
type NoteCardProps = { title: string; content: string };

export default function NoteCard({ title, content }: NoteCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
}
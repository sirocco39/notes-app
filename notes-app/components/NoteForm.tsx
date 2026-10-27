// components/NoteForm.tsx
type NoteFormProps = {
  action: (formData: FormData) => Promise<void>;
  note?: { id: string; title: string; content: string };
  submitLabel: string;
};

export default function NoteForm({ action, note, submitLabel }: NoteFormProps) {
  return (
    <form action={action}>
      {note && <input type="hidden" name="id" value={note.id} />}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        required
        maxLength={100}
        defaultValue={note?.title}
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        rows={6}
        maxLength={5000}
        defaultValue={note?.content}
      />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
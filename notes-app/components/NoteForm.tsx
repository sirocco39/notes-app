// components/NoteForm.tsx
"use client";

import { useActionState } from "react";
import type { NoteFormState } from "../lib/validation";

type NoteFormProps = {
  action: (
    prevState: NoteFormState,
    formData: FormData,
  ) => Promise<NoteFormState>;
  note?: { id: string; title: string; content: string };
  submitLabel: string;
};

const initialState: NoteFormState = {};

export default function NoteForm({ action, note, submitLabel }: NoteFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction}>
      {note && <input type="hidden" name="id" value={note.id} />}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        defaultValue={state.values?.title ?? note?.title}
        aria-invalid={Boolean(state.errors?.title)}
      />
      {state.errors?.title && <p role="alert">{state.errors.title[0]}</p>}

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        rows={6}
        defaultValue={state.values?.content ?? note?.content}
        aria-invalid={Boolean(state.errors?.content)}
      />
      {state.errors?.content && <p role="alert">{state.errors.content[0]}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
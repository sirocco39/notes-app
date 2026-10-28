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

const fieldBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-hidden focus:ring-2";
const fieldOk = "border-stone-300 focus:border-indigo-500 focus:ring-indigo-200";
const fieldBad = "border-red-500 focus:ring-red-200";

export default function NoteForm({ action, note, submitLabel }: NoteFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {note && <input type="hidden" name="id" value={note.id} />}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={state.values?.title ?? note?.title}
          aria-invalid={Boolean(state.errors?.title)}
          className={`${fieldBase} ${state.errors?.title ? fieldBad : fieldOk}`}
        />
        {state.errors?.title && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={state.values?.content ?? note?.content}
          aria-invalid={Boolean(state.errors?.content)}
          className={`${fieldBase} resize-y ${
            state.errors?.content ? fieldBad : fieldOk
          }`}
        />
        {state.errors?.content && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
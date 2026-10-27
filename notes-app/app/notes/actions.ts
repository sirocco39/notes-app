// app/notes/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { noteSchema, type NoteFormState } from "../../lib/validation";

function validate(formData: FormData) {
  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };
  return { values, parsed: noteSchema.safeParse(values) };
}

export async function createNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const { values, parsed } = validate(formData);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const note = await prisma.note.create({ data: parsed.data });
  revalidatePath("/notes");
  redirect(`/notes/${note.id}`);
}

export async function updateNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const id = String(formData.get("id") ?? "");
  const { values, parsed } = validate(formData);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  await prisma.note.update({ where: { id }, data: parsed.data });
  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  redirect(`/notes/${id}`);
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.note.deleteMany({ where: { id } });
  revalidatePath("/notes");
  redirect("/notes");
}
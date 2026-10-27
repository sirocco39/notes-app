// app/notes/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export async function createNote(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "");

  // Temporary guard; Friday's Zod validation replaces this
  if (!title) return;

  const note = await prisma.note.create({ data: { title, content } });
  revalidatePath("/notes");
  redirect(`/notes/${note.id}`);
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // deleteMany doesn't throw if the note is already gone (e.g. double click)
  await prisma.note.deleteMany({ where: { id } });
  revalidatePath("/notes");
  redirect("/notes");
}

export async function updateNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "");

  // Temporary guard; Zod replaces this
  if (!id || !title) return;

  await prisma.note.update({ where: { id }, data: { title, content } });
  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  redirect(`/notes/${id}`);
}
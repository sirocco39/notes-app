// app/notes/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export async function createNote(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "");

  // Temporary guard; Friday's Zod validation replaces this
  if (!title) return;

  const note = await prisma.note.create({ data: { title, content } });
  revalidatePath("/notes");
  redirect(`/notes/${note.id}`);
}
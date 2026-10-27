// lib/validation.ts
import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or fewer"),
  content: z.string().max(5000, "Content must be 5,000 characters or fewer"),
});

export type NoteFormState = {
  errors?: { title?: string[]; content?: string[] };
  values?: { title: string; content: string };
};
// app/notes/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NotesError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t complete that request.</p>
      <button onClick={() => unstable_retry()}>Try again</button>
      <Link href="/notes">Back to notes</Link>
    </main>
  );
}
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
    <main className="rounded-lg border border-red-200 bg-red-50 p-6">
      <h1 className="text-lg font-semibold text-red-800">
        Something went wrong
      </h1>
      <p className="mt-1 text-sm text-red-700">
        We couldn&apos;t complete that request.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
        <Link href="/notes" className="text-sm text-red-800 underline">
          Back to notes
        </Link>
      </div>
    </main>
  );
}
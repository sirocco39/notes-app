// app/notes/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-3" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="h-6 w-1/3 animate-pulse rounded bg-stone-200" />
      <div className="h-16 animate-pulse rounded-lg bg-stone-200" />
      <div className="h-16 animate-pulse rounded-lg bg-stone-200" />
    </div>
  );
}
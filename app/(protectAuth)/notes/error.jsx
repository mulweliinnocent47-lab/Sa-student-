"use client";

export default function NotesError({ reset }) {
  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <h2 className="text-lg font-semibold">Could not load notes</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        There was a problem loading the notes from Supabase.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}

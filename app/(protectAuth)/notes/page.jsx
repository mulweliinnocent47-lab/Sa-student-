"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Link2, Lock, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TxtReader } from "@/components/TxtReader";
import { useNotes } from "@/components/Noteprovider";
import Loading from "@/components/Loading.jsx";

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a, b) {
  const matrix = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + 1
            );
    }
  }

  return matrix[a.length][b.length];
}

function similarity(a, b) {
  if (!a || !b) return 0;

  const distance = levenshtein(a, b);
  const maxLength = Math.max(a.length, b.length);

  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

function searchNotes(notes, query) {
  const search = normalize(query);

  if (!search) {
    return notes;
  }

  const searchWords = search.split(" ");

  return notes
    .map((note) => {
      const title = normalize(note.title);
      const subject = normalize(note.subject);
      const folder = normalize(note.folder);
      const summary = normalize(note.summary);
      const grade = normalize(`grade ${note.grade}`);

      const fields = [
        { value: title, weight: 100 },
        { value: subject, weight: 80 },
        { value: folder, weight: 70 },
        { value: grade, weight: 60 },
        { value: summary, weight: 30 },
      ];

      let score = 0;

      // Full query matches
      for (const field of fields) {
        if (field.value === search) {
          score += field.weight;
        }

        if (field.value.includes(search)) {
          score += field.weight * 0.8;
        }

        score += similarity(search, field.value) * field.weight * 0.3;
      }

      // Match individual words.
      for (const queryWord of searchWords) {
        for (const field of fields) {
          const words = field.value.split(" ");

          for (const word of words) {
            if (word === queryWord) {
              score += field.weight * 0.7;
            } else if (word.includes(queryWord)) {
              score += field.weight * 0.4;
            } else {
              const sim = similarity(queryWord, word);

              if (sim >= 0.6) {
                score += sim * field.weight * 0.5;
              }
            }
          }
        }
      }

      return {
        note,
        score,
      };
    })
    .filter((item) => item.score > 10)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.note);
}

export default function NotesPage() {
  const { NOTES } = useNotes();

  const [url, setUrl] = useState("");
  const [loaded, setLoaded] = useState(null);
  const [search, setSearch] = useState("");

  if (!NOTES) {
    return <Loading />;
  }

  const filteredNotes = searchNotes(NOTES, search);

  return (
    <AppShell>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Notes
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Every note is a plain{" "}
        <code className="rounded bg-muted px-1">.txt</code> source, rendered
        with markdown formatting. Paste any text URL to read it the same way.
      </p>

      {/* Search */}
      <div className="mt-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {search && (
          <p className="mt-2 text-xs text-muted-foreground">
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "note" : "notes"} found
          </p>
        )}
      </div>

      {/* Open URL */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link2 className="size-4 text-primary" />
          Open a .txt source
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/notes/trig.txt"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          />

          <button
            className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
            onClick={() => setLoaded(url.trim() || null)}
          >
            Read
          </button>
        </div>

        {loaded && (
          <div className="mt-4 border-t border-border pt-4">
            <TxtReader src={loaded} />
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {filteredNotes.map((n) => (
          <Link
            key={n.slug}
            href={`/notes/${n.slug}`}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <BookOpen className="size-5 text-cyan" />

              {n.proOnly && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-1 text-xs font-medium">
                  <Lock className="size-3" />
                  Pro
                </span>
              )}
            </div>

            <p className="mt-3 font-semibold">{n.title}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {n.summary}
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              {n.subject} · Grade {n.grade} · {n.minutes} min read
            </p>
          </Link>
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-medium">No notes found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different word or check your spelling.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
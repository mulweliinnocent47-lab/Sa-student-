"use client";
import { useState } from "react";
import { Link2 } from "lucide-react";
import { TxtReader } from "@/components/TxtReader";

export function NotesUrlReader() {
  const [url, setUrl] = useState("");
  const [loaded, setLoaded] = useState(null);

  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Link2 className="size-4 text-primary" /> Open a .txt source
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
  );
}

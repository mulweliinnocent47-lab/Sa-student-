import "server-only";
import { getServerNotes } from "@/lib/notesServer";

// Kept as a compatibility export for old imports. It never creates or exposes
// a Supabase signed URL; the active notes UI uses getNotes/getServerNotes.
export async function getNotesFromSupabase() {
  return getServerNotes();
}

import "server-only";
import {
  getServerNotes,
  getServerNote,
  BUCKET,
} from "@/lib/notesServer";

export async function getNotes() {
  return getServerNotes();
}

export async function getNote(slug) {
  return getServerNote(slug);
}

export { getServerNotes, getServerNote, BUCKET };
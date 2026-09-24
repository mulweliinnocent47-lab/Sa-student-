import "server-only";
import { createClient } from "@/utils/supabase/server";

const BUCKET = "SA student";

const FOLDERS = [
  "grade-7-Geography",
  "grade-7-Life Orientation",
  "grade-7-Mathematics",
  "grade-7-History",
  "grade-7-EMS",
  "grade-7-English",
  "grade-7-Technology",
  "grade-7-Natural Science",
  "grade-7-Creative Arts",
];

export async function getServerNotes() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const allFiles = [];

 
  for (const folder of FOLDERS) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (error) {
      console.error(`Could not list folder "${folder}":`, error);
      throw new Error("Could not load notes");
    }

    for (const file of data ?? []) {
      if (
        file?.name &&
        file.name.toLowerCase().endsWith(".txt")
      ) {
        allFiles.push({
          ...file,
          folder,
        });
      }
    }
  }

  // Convert Storage files into note objects
  return allFiles.map((file) => {
    const slug = file.name;

    const title = file.name.replace(/\.txt$/i, "");
   const subject = file.folder.replace(/^grade-\d+-/, "");

    return {
      slug,
      title,

      // Folder where the file actually exists
      folder: file.folder,

      // Full path used by Supabase Storage
      storagePath: `${file.folder}/${file.name}`,

      subject,
      grade: 7,

      minutes: Math.max(
        1,
        Math.round((file.metadata?.size ?? 4000) / 400)
      ),

      summary: `Latest ${file.name}, free to download.`,

      // Browser calls our protected Next.js API route
      src: `/api/notes/${encodeURIComponent(slug)}`,

      proOnly: false,
    };
  });
  console.log()
}

export async function getServerNote(slug) {
  const notes = await getServerNotes();

  const decodedSlug = decodeURIComponent(slug);

  console.log("Looking for note:", decodedSlug);

  const note =
    notes.find((note) => note.slug === decodedSlug) ?? null;

  console.log("Found note:", note);

  return note;
}

export { BUCKET, FOLDERS };
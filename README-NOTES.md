# StudyHub SA — simple secure notes pattern

This version intentionally does **not** make the `[slug]` page a Client Component.

## Files added/changed

- `lib/notesServer.js` — server-only Supabase notes reader.
- `lib/notesHelper.js` — server helper used by layouts/pages.
- `app/api/notes/[slug]/route.js` — protected server proxy for note text.
- `app/(protectAuth)/notes/[slug]/page.jsx` — Server Component for a single note.
- `app/(protectAuth)/notes/error.jsx` — client error UI.

## The architecture

```text
Supabase Storage
      |
      | server-only
      v
lib/notesServer.js
      |
      +--------------------------+
      |                          |
      v                          v
(protectAuth)/layout       notes/[slug]/page
      |                          |
      | NoteProvider              | getNote(slug)
      v                          v
notes/page.jsx             Server-rendered page
      |
      v
/api/notes/[slug]
      |
      | server-only download
      v
Supabase Storage
```

### `/notes`

Your existing `NoteProvider` can continue to receive the server-fetched metadata from `(protectAuth)/layout.jsx`:

```jsx
const NOTES = await getNotes();

return (
  <NoteProvider NOTES={NOTES}>
    {children}
  </NoteProvider>
);
```

`notes/page.jsx` can use `useNotes()` because that page is a Client Component.

### `/notes/[slug]`

The slug page is a Server Component. It does not use `useNotes()` and does not have `"use client"`.

```jsx
const note = await getNote(params.slug);
```

This keeps `generateMetadata`, `generateStaticParams`, `notFound()` and the Supabase lookup on the server.

## The important security improvement

The browser does **not** receive a Supabase signed URL.

`TxtReader` receives:

```text
/api/notes/example.txt
```

That route checks the logged-in Supabase user and then downloads the file from Supabase **on the server**.

The browser only talks to your Next.js route.

This does not make the note text secret from a user who is authorized to read it — their browser necessarily receives the text so it can display it. It does prevent your Supabase storage URL/credentials from being exposed to the browser.

## Supabase configuration

This uses the same configuration from the supplied project:

```text
Bucket: SA student
Folder: grade-7-maths
Files: .txt
```

It expects your existing server Supabase client at:

```text
utils/supabase/server
```

Do not import `lib/notesServer.js` or `utils/supabase/server` from a Client Component.

## Why the slug is reliable

The slug is exactly the Supabase filename:

```text
Supabase: algebra.txt
URL:      /notes/algebra.txt
```

The API route requires an exact filename match inside `grade-7-maths`, so it cannot use the URL slug to escape to another storage path.

## One limitation

The example lists up to 100 files. If the folder will contain more than 100 notes, replace the list operation with pagination or a database table containing note metadata.

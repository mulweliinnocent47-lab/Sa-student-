import "../globals.css"
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {NoteProvider} from "@/components/Noteprovider.jsx"
import { getNotes } from "@/lib/notesHelper.js";
import Loading from "@/components/Loading.jsx"

export default async function ProtectedLayout({ children }) {
  const NOTES = await getNotes()
  if(!NOTES){
    return(<Loading />)
  }
  return(
          <NoteProvider NOTES={NOTES}>
           {children}
         </NoteProvider>
   )
}
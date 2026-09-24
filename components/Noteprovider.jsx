"use client";

import { createContext, useContext } from "react";

const NoteContext = createContext(null);

export function NoteProvider({ NOTES, children }) {
  return (
    <NoteContext.Provider value={{ NOTES }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  return useContext(NoteContext);
}
"use client"
import { Note } from '@/interfaces/misc_types';
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type NotesContextType = {
    Notes:Note[],
    newNoteAvailable:boolean,
    setNotes:Dispatch<SetStateAction<Note[]>>
    setnewNoteAvailable:Dispatch<SetStateAction<boolean>>
}
const NotesContext = createContext<NotesContextType|null>(null);
function NotesContextProvider({children}:{children:React.ReactNode}) {
    const [Notes, setNotes] = useState<Note[]>([]);
    const [newNoteAvailable, setnewNoteAvailable] = useState(true);
  return (
    <NotesContext.Provider value={{Notes,setNotes,newNoteAvailable,setnewNoteAvailable}}>{children}</NotesContext.Provider>
  )
}
export const useNotesContext = ()=>useContext(NotesContext);

export default NotesContextProvider
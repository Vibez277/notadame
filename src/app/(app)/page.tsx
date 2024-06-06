"use client"
import Image from "next/image";
import TopBar from "./_components/nav/TopBar";
import NewNoteModal from "./_components/NewNoteModal";
import { NoFoldersFound } from "@/components/component/no-folders-found";
import { useFoldersContext } from "@/components/contexts/FoldersContent";
import { useNotesContext } from "@/components/contexts/NotesContextProvider";
import { FolderCard } from "./_components/FolderCard";
import { Folder, Note } from "@/interfaces/misc_types";
import { NoteCard } from "./_components/NoteCard";
import { NoNotesFound } from "@/components/component/no-notes-found";

export default function Home() {
  const fa = useFoldersContext();
  const no = useNotesContext();
  return (
    <>
      <TopBar>
      <div className=" flex items-center flex-grow text-center">
        <h1 className="text-xl font-bold text-center self-center">All Notes</h1>
      </div>
      </TopBar>
      <div className="flex flex-grow relative border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
      {no?.Notes?.length! <= 0 ? (
          <NoNotesFound />
        ) : (
          no?.Notes?.map((note: Note, index: number) => {
            return (
              (
                <NoteCard key={index + note._id} note={note} />
              )
            );
          })
        )}
        <NewNoteModal/>
      </div>
    </>
  );
}

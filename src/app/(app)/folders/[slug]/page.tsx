"use client"
import React from 'react'
import TopBar from '../../_components/nav/TopBar'
import { useFoldersContext } from '@/components/contexts/FoldersContent'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NoFoldersFound } from '@/components/component/no-folders-found'
import { FolderCard } from '../../_components/FolderCard'
import { Folder, Note } from '@/interfaces/misc_types'
import NewNoteModal from '../../_components/NewNoteModal'
import { NothingFound } from '@/components/component/nothing-was-found'
import { useNotesContext } from '@/components/contexts/NotesContextProvider'
import { NoteCard } from '../../_components/NoteCard'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu'
import { useModalContext } from '@/components/contexts/ModalContextProvider'

function SpecificFolder({params}:{params:{
    slug:string
}}) {
  const fa = useFoldersContext();
  const no = useNotesContext();
  const mod = useModalContext();
  const router = useRouter();
  return (
    <>
    <TopBar>
    <div className=" flex items-center flex-grow text-center gap-2">
      <Button onClick={()=>{
        router.back();
      }} variant={"ghost"} size={"icon"}>
        <ArrowLeft/>
      </Button>
        <h1 className="text-xl font-bold text-center self-center">{fa?.folders.filter(f=>f._id===params.slug)[0].label}</h1>
      </div>
    </TopBar>
    <ContextMenu>
      <ContextMenuTrigger className='flex-grow flex'>
    <div className="flex flex-grow relative border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
        {fa?.folders?.filter(f=>f.parent===params.slug).length! <= 0 && no?.Notes?.filter((n:Note)=>n.folder===params.slug).length!<=0? (
          <NothingFound />
        ) : (
          <>
          {fa?.folders?.length!>0&&fa?.folders?.filter(f=>f.parent===params.slug).map((folder: Folder, index: number) => {
            return (
              (
                <FolderCard key={index + folder._id} folder={folder} />
              )
            );
          })}
          {
            no?.Notes.length!>0&&(
              no?.Notes.filter(n=>n.folder===params.slug).map((note,index)=>(
                <NoteCard note={note} key={index+note._id}/>
              ))
            )
          }
          </>)}
      </div>
          </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              New
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={()=>mod?.setNewNoteModalActive(true)}>
                Note
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
        <NewNoteModal/>
    </>
  )
}

export default SpecificFolder
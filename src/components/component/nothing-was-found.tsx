"use client"
import React from 'react';
import { Button } from "../ui/button"
import { useModalContext } from '../contexts/ModalContextProvider';
import { NotebookPen } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
export function NothingFound() {
  const mod = useModalContext();
  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full gap-4">
      <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800 text-2xl">
        🪹
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium">This Folder Is Empty</h3>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there are no Notes or Folders to display. You can create a new Note or a Folder to get started.
        </p>
        <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button>New Item</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full bg-slate-900'>
                        <DropdownMenuItem onClick={()=>mod?.setModalActive(true)}>
                            <Button variant={"ghost"} className='w-full text-white hover:text-slate-900'>Folder</Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>mod?.setNewNoteModalActive(true)}>
                            <Button variant={"ghost"} className='w-full text-white hover:text-slate-900'>Note</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
      </div>
    </div>
  )
}



"use client"
import React from 'react';
import { Button } from "../ui/button"
import { useModalContext } from '../contexts/ModalContextProvider';
export function NoFoldersFound() {
  const mod = useModalContext();
  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full gap-4">
      <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800">
        <FolderIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium">No Folders Found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there are no folders to display. You can create a new folder to get started.
        </p>
        <Button onClick={()=>mod?.setModalActive(true)}>
          <span className="">New Folder</span>
        </Button>
      </div>
    </div>
  )
}

function FolderIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

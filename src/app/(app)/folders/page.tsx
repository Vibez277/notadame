"use client";
import { useFoldersContext } from "@/components/contexts/FoldersContent";
import { Folder } from "@/interfaces/misc_types";
import React, { useEffect } from "react";
import TopBar from "../_components/nav/TopBar";
import { NoFoldersFound } from "@/components/component/no-folders-found";
import { FolderCard } from "../_components/FolderCard";
import { ContextMenuDemo } from "@/components/ContextMenu";
import { ContextMenu, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuContent } from "@radix-ui/react-context-menu";
import { useModalContext } from "@/components/contexts/ModalContextProvider";
import NewNoteModal from "../_components/NewNoteModal";

function Folders() {
  const fa = useFoldersContext();
  const mod = useModalContext();
  return (
    <>
      <TopBar>
        <div className=" flex items-center flex-grow text-center">
          <h1 className="text-xl font-bold text-center self-center">
            All Folders
          </h1>
        </div>
      </TopBar>
      <ContextMenu>
        <ContextMenuTrigger className=" flex-grow flex">
        <div className="flex flex-grow relative border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
        {fa?.folders?.length! <= 0 ? (
          <NoFoldersFound />
        ) : (
          fa?.folders?.map((folder: Folder, index: number) => {
            return (
              !folder.parent && (
                <FolderCard key={index + folder._id} folder={folder} />
              )
            );
          })
        )}
        <NewNoteModal/>
      </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              New
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={()=>mod?.setModalActive(true)}>
                Folder
              </ContextMenuItem>
              <ContextMenuItem onClick={()=>mod?.setNewNoteModalActive(true)}>
                Note
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

export default Folders;

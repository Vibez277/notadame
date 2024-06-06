"use client";
import { Folder, Note } from "@/interfaces/misc_types";
import { NotebookPen as Icon } from "lucide-react";
import React from "react";
import Link from "next/link";
import{ContextMenu,ContextMenuTrigger,ContextMenuItem, ContextMenuContent} from "@/components/ui/context-menu"
import { useModalContext } from "@/components/contexts/ModalContextProvider";

export function NoteCard({
  note,
  className,
}: {
  note: Note;
  className?: string;
}) {
  const mod = useModalContext();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
      <Link href={`/note/${note._id}`}>
      <div
        className={`${className} flex flex-col items-center border-2 p-1 rounded-lg w-[100px] h-max select-none hover:bg-slate-500 group cursor-pointer transition-colors duration-200`}
      >
        <Icon size={40} />
        <h2 className="font-semibold tracking-wider text-sm text-wrap line-clamp-2 group-hover:text-white">
          {note.title}
        </h2>
      </div>
    </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={()=>mod?.setRenameModal({
          ...mod.renameModal,
          active:true,
          id:note._id
        })}>
          Rename
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

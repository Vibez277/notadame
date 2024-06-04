"use client";
import { Folder } from "@/interfaces/misc_types";
import { Folder as Icon } from "lucide-react";
import React from "react";
import Link from "next/link";

export function FolderCard({
  folder,
  className,
}: {
  folder: Folder;
  className?: string;
}) {
  return (
    <Link href={`/folders/${folder._id}`}>
      <div
        className={`${className} flex flex-col items-center border-2 p-1 rounded-lg w-[100px] h-max select-none hover:bg-slate-500 group cursor-pointer transition-colors duration-200`}
      >
        <Icon size={40} />
        <h2 className="font-semibold tracking-wider text-sm text-wrap line-clamp-2 group-hover:text-white">
          {folder.label}
        </h2>
      </div>
    </Link>
  );
}

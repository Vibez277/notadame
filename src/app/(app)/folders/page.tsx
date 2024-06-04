"use client";
import { useFoldersContext } from "@/components/contexts/FoldersContent";
import { Folder } from "@/interfaces/misc_types";
import React, { useEffect } from "react";
import TopBar from "../_components/nav/TopBar";
import { NoFoldersFound } from "@/components/component/no-folders-found";
import { FolderCard } from "../_components/FolderCard";

function Folders() {
  const fa = useFoldersContext();
  return (
    <>
      <TopBar>
        <div className=" flex items-center flex-grow text-center">
          <h1 className="text-xl font-bold text-center self-center">
            All Folders
          </h1>
        </div>
      </TopBar>
      <div className="flex flex-grow border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
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
      </div>
    </>
  );
}

export default Folders;

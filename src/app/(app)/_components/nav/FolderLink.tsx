"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Folder as Icon } from "lucide-react";
import { Folder } from "@/interfaces/misc_types";
import { useFoldersContext } from "@/components/contexts/FoldersContent";

function FolderLink({ folder,className }: { folder: Folder,className?:string }) {
    const path = usePathname();
    const [dropped, setDropped] = useState(false);
    const link = "/folder/"+folder._id;
    const fa = useFoldersContext();
    return (
      <div className="w-full">
        <Button
        className="flex w-full items-center justify-between"
        variant={link === path ? "default" : "outline"}
      >
        <div className="flex items-center gap-3">
        <Icon size={24}/>
        <Link className="flex-grow" href={link}> <p className="font-semibold tracking-wider">{folder.label}</p></Link>
        </div>
        {
          folder.subfolders?.length>0&&(<Button onClick={()=>setDropped(!dropped)} variant={"ghost"} size={"icon"}>
          {
            dropped?(<ChevronUp/>):(<ChevronDown />)
          }
        </Button>)
        }
      </Button>
      <div className={`ml-3 mt-1 overflow-hidden ${dropped?"h-auto":"h-0"} transition-all`}>
      {
        folder.subfolders?.length>0 && folder.subfolders.map((folder,index)=>(
          <FolderLink folder={fa?.folders.filter(f=>f._id===(folder._id||folder))[0]!} key={index+folder._id}/>
        ))
      }
      </div>
      </div>
    );
  }
  export default FolderLink
"use client";
import React, { useState } from "react";
import { link } from "./NavBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

function CustormLink({ link }: { link: link }) {
  const Icon = link.icon;
  const path = usePathname();
  if (link.isFolder) {
    return <FolderLink link={link} />;
  } else {
    return (
      <OtherLink link={link}/>
    );
  }
}
function FolderLink({ link,className }: { link: link,className?:string }) {
  const path = usePathname();
  const [dropped, setDropped] = useState(false);
  const Icon = link.icon;
  return (
    <div className="w-full">
      <Button
      className="flex w-full items-center justify-between"
      variant={link.href === path ? "default" : "outline"}
    >
      <div className="flex items-center gap-3">
      <Icon size={24}/>
      <Link className="flex-grow" href={link.href}> <p className="font-semibold tracking-wider">{link.label}</p></Link>
      </div>
      {
        link.subFolders&&(<Button onClick={()=>setDropped(!dropped)} variant={"ghost"} size={"icon"}>
        {
          dropped?(<ChevronUp/>):(<ChevronDown />)
        }
      </Button>)
      }
    </Button>
    <div className={`ml-3 mt-1 overflow-hidden ${dropped?"h-auto":"h-0"} transition-all`}>
    {
      link.subFolders && link.subFolders.map((folder,index)=>(
        <FolderLink link={folder} key={index+folder.href}/>
      ))
    }
    </div>
    </div>
  );
}
function OtherLink({ link,className }: { link: link,className?:string }) {
  const path = usePathname();
  const [dropped, setDropped] = useState(false);
  const Icon = link.icon;
  return (
    <Link href={link.href} className="w-full">
        <Button
          className="flex items-center gap-3 w-full justify-start"
          variant={link.href === path ? "default" : "outline"}
        >
          <Icon size={24} />
          <p className="font-semibold tracking-wider">{link.label}</p>
        </Button>
      </Link>
  );
}

export default CustormLink;

"use client"
import { useFoldersContext } from '@/components/contexts/FoldersContent';
import { Folder } from '@/interfaces/misc_types';
import { Folder as Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import TopBar from '../_components/nav/TopBar';
import Link from 'next/link';

function Folders() {
    const fa = useFoldersContext();
    useEffect(() => {
      async function fetchFolders(){
        try {
            const token = localStorage.getItem("notadame-auth");
            if(!token){
                fa?.setFolders([]);
                return null;
            }
            const res = await fetch("/api/folder",{
                method:"GET",
                headers:{
                    "Authorization":"Bearer "+token
                  }
            });
            const data = await res.json();
            if(!data.success){
                fa?.setFolders([]);
                return null;
            }
            fa?.setFolders(data.folders);
        } catch (error) {
            fa?.setFolders([]);
            console.error(error);
        }finally{
            fa?.setnewFolderAvailable(false);
        }
      }
      fetchFolders();
    }, [fa?.newFolderAvailable===true])
  return (
    <>
    <TopBar>
    <div className=" flex items-center flex-grow text-center">
        <h1 className="text-xl font-bold text-center self-center">All Folders</h1>
      </div>
    </TopBar>
    <div className='flex flex-grow border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden'>
        {
            fa?.folders?.map((folder:Folder,index:number)=>{
                return (
                    !folder.parent&&<FolderCard key={index+folder._id} folder={folder}/>
                )
            })
        }
    </div>
    </>
  )
}

function FolderCard({folder,className}:{folder:Folder,className?:string}){
    return(
        <Link href={`/folders/${folder._id}`}>
        <div className={`${className} flex flex-col items-center border-2 p-1 rounded-lg w-[100px] h-max select-none hover:bg-slate-500 group cursor-pointer transition-colors duration-200`}>
            <Icon size={40}/>
            <h2 className='font-semibold tracking-wider text-sm text-wrap line-clamp-2 group-hover:text-white'>{folder.label}</h2>
        </div>
        </Link>
    )
}

export default Folders
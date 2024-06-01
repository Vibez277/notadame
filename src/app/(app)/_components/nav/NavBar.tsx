"use client"
import Logo from '@/components/Logo'
import { NavContext, useNavContext } from '@/components/contexts/NavContext'
import { Book, Folder, LucideIcon, Notebook, NotebookPen, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import CustormLink from './CustormLink'

export type link={
    label:string,
    href:string,
    icon:LucideIcon,
    isFolder:boolean,
    isNote:boolean,
    subFolders?:link[],
}
const Links:link[]=[
    {
        label:"Notes",
        href:"/",
        icon:Book,
        isNote:false,
        isFolder:false
    },
    {
        label:"Settings",
        href:"/settings",
        icon:Book,
        isNote:false,
        isFolder:false
    },
    {
        label:"Folder1",
        href:"/folder/1",
        icon:Folder,
        isNote:false,
        isFolder:true,
        subFolders:[
            {
                label:"SubFolder1",
                href:"/folder/1-1",
                icon:Folder,
                isNote:false,
                isFolder:true,
            },
        ]
    },
    {
        label:"Folder2",
        href:"/folder/2",
        icon:Folder,
        isNote:false,
        isFolder:true,
        subFolders:[
            {
                label:"SubFolder2",
                href:"/folder/2-1",
                icon:Folder,
                isNote:false,
                isFolder:true,
            },
        ]
    },
    {
        label:"Note1",
        href:"/note/1",
        icon:NotebookPen,
        isNote:true,
        isFolder:false,
    },
]
function NavBar() {
    const nav = useNavContext();
  return ( 
    <nav className={`h-full sm:w-56 sm:relative absolute top-0 left-0 ${nav?.isActive?"translate-x-0":"translate-x-[-100%] sm:translate-x-0"} transition-transform duration-300 w-full bg-white  overflow-x-hidden flex flex-col items-center divide-y-2 gap-5`}>
        <div className='flex items-center justify-between w-full'>
        <Logo/>
        <X className='sm:hidden' onClick={()=>nav?.setActive(false)}/>
        </div>
        <div className='flex-grow flex flex-col pt-5 w-full px-2 gap-3'>
            {
                Links.map((link,index)=>(
                    <CustormLink link={link} key={index+link.href}/>
                ))
            }
        </div>
    </nav>
  )
}

export default NavBar
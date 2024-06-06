"use client"
import Logo from '@/components/Logo'
import { NavContext, useNavContext } from '@/components/contexts/NavContext'
import { Book, Folder as FolderIcon, LucideIcon, Notebook, NotebookPen, Settings, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import CustormLink from './CustormLink'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useModalContext } from '@/components/contexts/ModalContextProvider'
import { useAuthContext } from '@/components/contexts/AuthContextProvider'
import { Folder } from '@/interfaces/misc_types'
import FolderLink from './FolderLink'
import { useFoldersContext } from '@/components/contexts/FoldersContent'

export type link={
    label:string,
    href:string,
    icon:LucideIcon,
    subFolders?:link[],
}
export const Links:link[]=[
    {
        label:"Notes",
        href:"/",
        icon:Book,
    },
    {
        label:"Settings",
        href:"/settings",
        icon:Settings,
    },
    {
        label:"Folders",
        href:"/folders",
        icon:FolderIcon,
    },
]
function NavBar() {
    const nav = useNavContext();
    const mod = useModalContext();
    const auth = useAuthContext();
    
  return ( 
    <nav className={`h-screen sm:w-56 sm:relative absolute top-0 left-0 ${nav?.isActive?"translate-x-0":"translate-x-[-100%] sm:translate-x-0"} transition-transform duration-300 w-full bg-white  overflow-hidden flex flex-col items-center divide-y-2 gap-5`}>

        <div className='flex items-center justify-between w-full'>
        <Logo/>
        <X className='sm:hidden' onClick={()=>nav?.setActive(false)}/>
        </div>
        <p className='text-xl font-semibold font-sans'>{auth?.user?.username}</p>
        <div className='flex flex-col pt-5 w-full px-2 gap-3'>
            <div className='w-full flex items-center justify-center'>
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
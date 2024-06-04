"use client"
import { redirect, usePathname } from 'next/navigation'
import React, { ReactNode, useContext } from 'react'
import NavBar from './_components/nav/NavBar'
import NavContextProvider, { NavContext, useNavContext } from '@/components/contexts/NavContext'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/components/contexts/AuthContextProvider'
import NewFolderModal from './_components/NewFolderModal'

interface props{
    children:ReactNode
}
function AppLayout({children}:props) {
  const auth = useAuthContext();
  if(!auth?.isAuthenticated){
    redirect("/auth/signin");
  }
  return (
    <div className='flex items-center gap-2 h-screen'>
      <NavBar/>
      <div className='flex-grow h-full flex flex-col'>
        {children}
        <NewFolderModal/>
      </div>
    </div>
  )
}

export default AppLayout
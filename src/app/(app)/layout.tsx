"use client"
import { redirect } from 'next/navigation'
import React, { ReactNode, useContext } from 'react'
import NavBar from './_components/nav/NavBar'
import NavContextProvider, { NavContext, useNavContext } from '@/components/contexts/NavContext'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/components/contexts/AuthContextProvider'

interface props{
    children:ReactNode
}
function AppLayout({children}:props) {
  const nav = useNavContext();
  const auth = useAuthContext();
  if(!auth?.isAuthenticated){
    redirect("/auth/signin");
  }
  const changeNav = ()=>{
    nav?.setActive(true);
    console.log(nav?.isActive);
  }
  return (
    <div className='flex items-center gap-2 h-screen'>
      <NavBar/>
      <div className='flex-grow h-full bg-black'>
        <div className='w-full bg-white flex items-center p-2'>
          <Button className='sm:hidden' onClick={changeNav} size={"icon"}>
          <Menu size={28}/>
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AppLayout
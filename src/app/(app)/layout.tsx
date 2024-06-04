"use client"
import { redirect, usePathname } from 'next/navigation'
import React, { ReactNode, useContext, useEffect } from 'react'
import NavBar from './_components/nav/NavBar'
import NavContextProvider, { NavContext, useNavContext } from '@/components/contexts/NavContext'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/components/contexts/AuthContextProvider'
import NewFolderModal from './_components/NewFolderModal'
import { useFoldersContext } from '@/components/contexts/FoldersContent'

interface props{
    children:ReactNode
}
function AppLayout({children}:props) {
  const auth = useAuthContext();
  if(!auth?.isAuthenticated){
    redirect("/auth/signin");
  }
  const fa = useFoldersContext();
  useEffect(() => {
    async function fetchFolders() {
      try {
        const token = localStorage.getItem("notadame-auth");
        if (!token) {
          fa?.setFolders([]);
          return null;
        }
        const res = await fetch("/api/folder", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        if (!data.success) {
          fa?.setFolders([]);
          return null;
        }
        fa?.setFolders(data.folders);
      } catch (error) {
        fa?.setFolders([]);
        console.error(error);
      } finally {
        fa?.setnewFolderAvailable(false);
      }
    }
    fetchFolders();
  }, [fa?.newFolderAvailable === true]);
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
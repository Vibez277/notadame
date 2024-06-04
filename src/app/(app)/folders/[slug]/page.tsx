"use client"
import React from 'react'
import TopBar from '../../_components/nav/TopBar'
import { useFoldersContext } from '@/components/contexts/FoldersContent'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Folder({params}:{params:{
    slug:string
}}) {
  const fa = useFoldersContext();
  const router = useRouter();
  return (
    <>
    <TopBar>
    <div className=" flex items-center flex-grow text-center gap-2">
      <Button onClick={()=>{
        router.back();
      }} variant={"ghost"} size={"icon"}>
        <ArrowLeft/>
      </Button>
        <h1 className="text-xl font-bold text-center self-center">{fa?.folders.filter(f=>f._id===params.slug)[0].label}</h1>
      </div>
    </TopBar>
    <div className='text-white'>Folder {params.slug}</div>
    </>
  )
}

export default Folder
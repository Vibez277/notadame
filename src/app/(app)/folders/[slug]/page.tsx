"use client"
import React from 'react'
import TopBar from '../../_components/nav/TopBar'
import { useFoldersContext } from '@/components/contexts/FoldersContent'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NoFoldersFound } from '@/components/component/no-folders-found'
import { FolderCard } from '../../_components/FolderCard'
import { Folder } from '@/interfaces/misc_types'

function SpecificFolder({params}:{params:{
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
    <div className="flex flex-grow border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
        {fa?.folders?.length! <= 0 ? (
          <NoFoldersFound />
        ) : (
          fa?.folders?.filter(f=>f.parent===params.slug).map((folder: Folder, index: number) => {
            console.log(folder)
            return (
              (
                <FolderCard key={index + folder._id} folder={folder} />
              )
            );
          })
        )}
      </div>
    </>
  )
}

export default SpecificFolder
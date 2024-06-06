"use client"
import { Folder } from '@/interfaces/misc_types';
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type FoldersContextType = {
    folders:Folder[],
    newFolderAvailable:boolean,
    setFolders:Dispatch<SetStateAction<Folder[]>>
    setnewFolderAvailable:Dispatch<SetStateAction<boolean>>
}
const FoldersContext = createContext<FoldersContextType|null>(null);
function FoldersContextProvider({children}:{children:React.ReactNode}) {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [newFolderAvailable, setnewFolderAvailable] = useState(true);
  return (
    <FoldersContext.Provider value={{folders,setFolders,newFolderAvailable,setnewFolderAvailable}}>{children}</FoldersContext.Provider>
  )
}
export const useFoldersContext = ()=>useContext(FoldersContext);

export default FoldersContextProvider
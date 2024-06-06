"use client"
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type ModalContextType = {
    modalActive:boolean,
    renameModal:{
      active: boolean;
      id: string;
  },
    setModalActive:Dispatch<SetStateAction<boolean>>,
    setRenameModal:React.Dispatch<React.SetStateAction<{
      active: boolean;
      id: string;
  }>>
  newNoteModalActive:boolean,
  updateNoteModal:{
      active: boolean;
      id: string;
  },
  setNewNoteModalActive:Dispatch<SetStateAction<boolean>>,
  setUpdateNoteModal:React.Dispatch<React.SetStateAction<{
      active: boolean;
      id: string;
  }>>
}
const ModalContext = createContext<ModalContextType|null>(null);
function ModalContextProvider({children}:{children:React.ReactNode}) {
    const [modalActive, setModalActive] = useState(false);
    const [renameModal, setRenameModal] = useState({
      active:false,
      id:""
    });
    const [newNoteModalActive, setNewNoteModalActive] = useState(false);
    const [updateNoteModal, setUpdateNoteModal] = useState({
      active:false,
      id:""
    });
  return (
    <ModalContext.Provider value={{modalActive,setModalActive,renameModal,setRenameModal,newNoteModalActive,setNewNoteModalActive,updateNoteModal,setUpdateNoteModal}}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = ()=>useContext(ModalContext);

export default ModalContextProvider
"use client"
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type ModalContextType = {
    modalActive:boolean,
    setModalActive:Dispatch<SetStateAction<boolean>>
}
const ModalContext = createContext<ModalContextType|null>(null);
function ModalContextProvider({children}:{children:React.ReactNode}) {
    const [modalActive, setModalActive] = useState(false);
  return (
    <ModalContext.Provider value={{modalActive,setModalActive}}>{children}</ModalContext.Provider>
  )
}
export const useModalContext = ()=>useContext(ModalContext);

export default ModalContextProvider
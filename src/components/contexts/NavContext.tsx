"use client"
import React,{useState,createContext,useContext, Dispatch, SetStateAction, useEffect} from 'react';

export type NavContextType={
    isActive:boolean,
    setActive:Dispatch<SetStateAction<boolean>>
}

export const NavContext = createContext<NavContextType|null>(null);

export default function NavContextProvider({children}:{children:React.ReactNode}){
    const [isActive, setActive] = useState(false);
    useEffect(()=>{
        console.log(isActive);
    },[isActive])
    return(
        <NavContext.Provider value={{isActive,setActive}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = ()=>useContext(NavContext);
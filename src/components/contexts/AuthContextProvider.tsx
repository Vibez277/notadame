"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../../../interfaces/user_types';
import { useToast } from '../ui/use-toast';

type authtype = {
    isAuthenticated:boolean,
    user:User|null,
    LoginUser:(form:{email:string,password:string})=>Promise<void>
}

const Context = createContext<authtype|null>(null);

function AuthContextProvider({children}:{children:React.ReactNode}) {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user,setUser] = useState<User|null>(null);
    async function LoginUser(form:{email:string,password:string}) {
        try {
          const body = {
            email: form.email,
            password: form.password,
          };
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            body: JSON.stringify(body),
          });
          const data = await res.json();
          if (!data.success) {
            toast({
              title: "SignIn Error",
              description: data.message,
              variant: "destructive",
            });
            setIsAuthenticated(false);
            setUser(null);
          } else {
            localStorage.setItem("notadame-auth", data.token);
            toast({
              title: "SignIn Successfull",
              variant: "default",
              style: {
                backgroundColor: "green",
              },
            });
            setIsAuthenticated(true);
            setUser(data.user);
          }
        } catch (error: any) {
          console.log("Error: " + error.message);
        }
      }
    function SignOut(){
        localStorage.removeItem("notadame-auth");
        setIsAuthenticated(false);
        setUser(null)
    }
    useEffect(()=>{
        async function authenticate(){
            const token = localStorage.getItem("notadame-auth");
            if(!token){
                setIsAuthenticated(false);
                setUser(null)
            }else{
                setIsAuthenticated(true)
            }
        }
        authenticate();
    },[isAuthenticated])
  return (
    <Context.Provider value={{isAuthenticated,user,LoginUser}}>{children}</Context.Provider>
  )
}

export const useAuthContext=()=>useContext(Context);

export default AuthContextProvider
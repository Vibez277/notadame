"use client"
import { useAuthContext } from '@/components/contexts/AuthContextProvider';
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

interface props{
    children:ReactNode
}
function AuthLayout({children}:props) {
  const auth = useAuthContext();
  if(auth?.isAuthenticated){
    redirect("/");
  }
  return (
    <div>{children}</div>
  )
}

export default AuthLayout
"use client"
import React, { useState } from 'react'
import TopBar from '../../_components/nav/TopBar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useNotesContext } from '@/components/contexts/NotesContextProvider';
import { toast } from '@/components/ui/use-toast';

function Note({params}:{params:{slug:string}}) {
  const router = useRouter();
  const no = useNotesContext();
  const note = no?.Notes.filter(n=>n._id===params.slug)[0];
  
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title:note?.title,
    content:note?.content
  })
  async function updateNote(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
        const token = localStorage.getItem("notadame-auth");
            if(!token){
                return toast({
                    title:"Failure",
                    description:"Error Authenticating",
                    style:{
                        backgroundColor:"green"
                    }
                })
            }
      const res = await fetch(`/api/note/${params.slug}`, {
        method: "PUT",
        headers:{
            "Authorization":"Bearer "+token
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!resData.success) {
        return toast({
          title: "Error Updating Note Data",
          description: resData.message,
          variant: "destructive",
        });
      }
      toast({
        title: "Success",
        style: {
          backgroundColor: "green",
        },
      });
      no?.setnewNoteAvailable(true);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
    <TopBar>
    <div className=" flex items-center flex-grow text-center gap-2">
      <Button onClick={()=>{
        router.back();
      }} variant={"ghost"} size={"icon"}>
        <ArrowLeft/>
      </Button>
        <h1 className="text-xl font-bold text-center self-center">{no?.Notes.filter(n=>n._id===params.slug)[0].title}</h1>
      </div>
    </TopBar>
    <div className="flex flex-grow relative border-2 rounded-md gap-3 p-4 flex-wrap overflow-y-auto overflow-x-hidden">
      <form className='w-full flex flex-col'>
        <h1 className='font-semibold text-sm text-gray-300 tracking-widest'>Title</h1>
        <input className='focus:outline-none mb-3' type="text" value={data.title} onChange={(e)=>setData({...data,title:e.target.value})}/>
        <h1 className='font-semibold text-sm text-gray-300 tracking-widest'>Content</h1>
        <textarea className='flex-grow resize-none focus:outline-none' value={data.content} onChange={(e)=>setData({...data,content:e.target.value})}></textarea>
        {
          (data.title!==note?.title || data.content !==note?.content) &&(
            <div className="flex items-center mt-3 justify-between gap-2">
          <Button onClick={updateNote}>
            {loading ? <div>Loading...</div> : <span>Update</span>}
          </Button>
        </div>
          )
        }
      </form>
    </div>
    </>
  )
}

export default Note
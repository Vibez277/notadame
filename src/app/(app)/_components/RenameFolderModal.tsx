"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModalContext } from "@/components/contexts/ModalContextProvider";
import { useAuthContext } from "@/components/contexts/AuthContextProvider";
import { Folder } from "@/interfaces/misc_types";
import { toast } from "@/components/ui/use-toast";
import { useFoldersContext } from "@/components/contexts/FoldersContent";

function RenameFolderModal() {
  const auth = useAuthContext();
  const [data, setData] = useState({
    label: "",
  });
  const [loading, setLoading] = useState(false);
  const mod = useModalContext();
  const fa = useFoldersContext();

  async function renameFolder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = {
      label: data.label,
    };

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
      const res = await fetch(`/api/folder/${mod?.renameModal.id}`, {
        method: "PUT",
        headers:{
            "Authorization":"Bearer "+token
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        return toast({
          title: "Folder Renaming Error",
          description: data.message,
          variant: "destructive",
        });
      }
      toast({
        title: "Success",
        style: {
          backgroundColor: "green",
        },
      });
      fa?.setnewFolderAvailable(true);
      setData({ ...data, label: "" });
      mod?.setRenameModal({
        ...mod.renameModal,
        active:false,
        id:""
      });
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    async function fetchData(){
        if(!mod?.renameModal.id){
            return;
        }
        setData({...data,label:fa?.folders.find(f=>f._id===mod.renameModal.id)?.label!});
    }
    fetchData();
  },[mod?.renameModal.id])
  return (
    <div
      className={`absolute ${
        mod?.renameModal.active ? "flex" : "hidden"
      } items-center justify-center w-full h-full top-0 left-0 z-30 bg-slate-950/70`}
    >
      <div className="maw-w-[400px] p-5 min-h-10 bg-white rounded-2xl">
        <Input
          value={data.label}
          onChange={(e) => setData({ ...data, label: e.target.value })}
          className="mt-2"
          placeholder="Name Folder"
          type="text"
          name="label"
          id="label"
        />
        <div className="flex items-center mt-3 justify-between gap-2">
          <Button onClick={renameFolder}>
            {loading ? <div>Loading...</div> : <span>Rename</span>}
          </Button>
          <Button
            onClick={() => {
              setData({ ...data, label: "" });
              mod?.setRenameModal({
                ...mod.renameModal,
                active:false,
                id:""
              });
            }}
            variant={"destructive"}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RenameFolderModal;

"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Links } from "./nav/NavBar";
import { Input } from "@/components/ui/input";
import { useModalContext } from "@/components/contexts/ModalContextProvider";
import { useAuthContext } from "@/components/contexts/AuthContextProvider";
import { Folder } from "@/interfaces/misc_types";
import { toast } from "@/components/ui/use-toast";
import { useFoldersContext } from "@/components/contexts/FoldersContent";

function NewFolderModal() {
  const [sliderState, setSliderState] = useState(false);
  const [query, setQuery] = useState("");
  const auth = useAuthContext();
  const [data, setData] = useState({
    label: "",
  });
  const [dropActive, setDropActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const mod = useModalContext();
  const fa = useFoldersContext();

  async function createNewFolder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    let parent;
    if (sliderState) {
      if (!selectedFolder) {
        return toast({
          title: "A Parent Folder Must Be Selected First",
          variant: "destructive",
        });
      }
      parent = selectedFolder?._id;
    } else {
      parent = undefined;
    }
    const body = {
      label: data.label,
      subfolders: [],
      parent,
      notes: [],
      owner: auth?.user?._id,
    };

    try {
      const res = await fetch("/api/folder", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        return toast({
          title: "Folder Creation Error",
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
      setDropActive(false);
      setQuery("");
      setSliderState(false);
      mod?.setModalActive(false);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div
      className={`absolute ${
        mod?.modalActive ? "flex" : "hidden"
      } items-center justify-center w-full h-full top-0 left-0 z-30 bg-slate-950/70`}
    >
      <div className="maw-w-[400px] p-5 min-h-10 bg-white rounded-2xl">
        <div className="flex items-center gap-2">
          <span>Is Subfolder?</span>
          <div
            onClick={() => setSliderState(!sliderState)}
            className="switch w-[30px] h-[15px] bg-slate-900 rounded-full p-[0.5px] cursor-pointer"
          >
            {/**/}
            <div
              className={`bulb w-1/2 h-full rounded-full bg-white transition-all duration-200 ${
                sliderState
                  ? "translate-x-[95%] bg-green-600 shadow-2xl shadow-green-500"
                  : "translate-x-[1%]"
              }`}
            ></div>
          </div>
        </div>

        {/*dropdown menu */}
        {sliderState && (
          <div className="mt-2 w-full">
            <div className="trigger border-gray-700 border-[2px] rounded-md w-full">
              <form onSubmit={createNewFolder}>
                <input
                  onFocus={() => setDropActive(!dropActive)}
                  className="p-1 focus:outline-none w-full"
                  type="search"
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search/Select a parent folder..."
                />
              </form>
            </div>

            <div
              className={`content overflow-y-hidden relative z-20 bg-slate-900 rounded-lg mt-1 ${
                dropActive ? "p-2 h-auto" : "p-0 h-0"
              }`}
            >
              {fa?.folders.map(
                (folder, index) =>
                  folder.label.toLowerCase().includes(query.toLowerCase()) && (
                    <div
                      onClick={() => {
                        setQuery(folder.label);
                        setSelectedFolder(folder);
                        setDropActive(false);
                      }}
                      className="border-white border-2 my-1 p-1 text-white rounded-md"
                      key={index + folder._id}
                    >
                      <span>{folder.label}</span>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {/*end dropdown menu*/}

        <Input
          value={data.label}
          onChange={(e) => setData({ ...data, label: e.target.value })}
          className="mt-2"
          placeholder="New Folder Name"
          type="text"
          name="label"
          id="label"
        />
        <div className="flex items-center mt-3 justify-between gap-2">
          <Button onClick={createNewFolder}>
            {loading ? <div>Loading...</div> : <span>Create Folder</span>}
          </Button>
          <Button
            onClick={() => {
              setData({ ...data, label: "" });
              setDropActive(false);
              setQuery("");
              setSliderState(false);
              mod?.setModalActive(false);
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

export default NewFolderModal;

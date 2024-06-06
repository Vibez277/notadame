"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModalContext } from "@/components/contexts/ModalContextProvider";
import { useAuthContext } from "@/components/contexts/AuthContextProvider";
import { Folder } from "@/interfaces/misc_types";
import { toast } from "@/components/ui/use-toast";
import { useFoldersContext } from "@/components/contexts/FoldersContent";
import { Textarea } from "@/components/ui/textarea";
import { useNotesContext } from "@/components/contexts/NotesContextProvider";

function NewNoteModal() {
  const [sliderState, setSliderState] = useState(false);
  const [query, setQuery] = useState("");
  const auth = useAuthContext();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [dropActive, setDropActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const mod = useModalContext();
  const fa = useFoldersContext();
  const no = useNotesContext();

  async function createNewNote(e: React.FormEvent) {
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
      title: data.title,
      content:data.content,
      folder:parent,
      owner: auth?.user?._id,
    };

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        return toast({
          title: "Note Saving Error",
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
      no?.setnewNoteAvailable(true);
      setData({ ...data, label: "" });
      setDropActive(false);
      setQuery("");
      setSliderState(false);
      mod?.setNewNoteModalActive(false);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div
      className={`absolute ${
        mod?.newNoteModalActive ? "flex" : "hidden"
      } items-center justify-center w-full h-full top-0 left-0 z-30 bg-slate-950/70`}
    >
      <div className="w-full p-5 h-full flex flex-col bg-white">
        <div className="flex items-center gap-2">
          <span>Is In A folder?</span>
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
          <div className="mt-2 max-w-52">
            <div className="trigger border-gray-700 border-[2px] rounded-md">
              <form onSubmit={createNewNote}>
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
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="mt-2"
          placeholder="Title"
          type="text"
          name="label"
          id="label"
        />
        <Textarea placeholder="Start here..." className="mt-3 flex-grow resize-none"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}/>
        <div className="flex items-center mt-3 justify-between gap-2">
          <Button onClick={createNewNote}>
            {loading ? <div>Loading...</div> : <span>Save Note</span>}
          </Button>
          <Button
            onClick={() => {
              setData({ ...data, title: "",content: "" });
              setDropActive(false);
              setQuery("");
              setSliderState(false);
              mod?.setNewNoteModalActive(false);
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

export default NewNoteModal;

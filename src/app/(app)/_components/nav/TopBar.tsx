"use client";
import { useNavContext } from "@/components/contexts/NavContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { ReactNode } from "react";

function TopBar({children}:{children:ReactNode}) {
  const nav = useNavContext();
  const changeNav = () => {
    nav?.setActive(true);
    console.log(nav?.isActive);
  };
  return (
    <div className="w-full bg-white flex items-center p-2">
      <Button
        variant={"outline"}
        className="sm:hidden"
        onClick={changeNav}
        size={"icon"}
      >
        <Menu size={28} />
      </Button>
      {children}
    </div>
  );
}

export default TopBar;

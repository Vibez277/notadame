"use client";
import React, { useState } from "react";
import { link } from "./NavBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

function CustormLink({ link }: { link: link }) {
  const Icon = link.icon;
  const path = usePathname();
    return (
      <OtherLink link={link}/>
    );
}

function OtherLink({ link,className }: { link: link,className?:string }) {
  const path = usePathname();
  const [dropped, setDropped] = useState(false);
  const Icon = link.icon;
  return (
    <Link href={link.href} className="w-full">
        <Button
          className="flex items-center gap-3 w-full justify-start"
          variant={link.href === path ? "default" : "outline"}
        >
          <Icon size={24} />
          <p className="font-semibold tracking-wider">{link.label}</p>
        </Button>
      </Link>
  );
}

export default CustormLink;

import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { iconSize } from "@/lib/constants";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface SectionPopoverProps {
  editSection: (id: string, name: string) => void;
  name: string;
  id: string;
}

export default function SectionPopover({
  editSection,
  name,
  id,
}: SectionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Section options"
          className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light"
        >
          <Ellipsis size={iconSize} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12rem]">
        <button
          className="flex items-center gap-2 p-1 w-full hover:bg-slate-200 duration-200 cursor-pointer"
          onClick={() => editSection(id, name)}
        >
          <Pencil size={iconSize} />
          <span>Rename section</span>
        </button>

        <>
          <DeleteModal id={id} type="section" />
        </>
      </PopoverContent>
    </Popover>
  );
}

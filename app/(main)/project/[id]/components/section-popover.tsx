import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useModal } from "@/hooks/useModal";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React from "react";

interface SectionPopoverProps {
  editSection: (id: string, name: string) => void;
  iconSize: number;
  name: string;
  id: string;
}

export default function SectionPopover({
  editSection,
  iconSize,
  name,
  id,
}: SectionPopoverProps) {
  const { openDeleteSectionModal } = useModal();

  return (
    <Popover>
      <PopoverTrigger>
        <button className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light">
          <Ellipsis size={iconSize} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12rem]">
        <div
          className="p-1 flex items-center gap-2 hover:bg-slate-200 duration-200 cursor-pointer"
          onClick={() => editSection(id, name)}
        >
          <Pencil size={iconSize} />
          <span>Rename section</span>
        </div>
        <div
          className="p-1 flex items-center gap-2 text-red-500 hover:bg-slate-200 duration-200 cursor-pointer"
          onClick={() => openDeleteSectionModal(id)}
        >
          <Trash2 size={iconSize} />
          <span>Delete section</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

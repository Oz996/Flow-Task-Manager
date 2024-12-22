import PopoverButton from "@/components/popover-components/popover-button";
import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React from "react";
import EditButton from "@/components/popover-components/edit-button";

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
        <PopoverButton labelFor="Section" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12rem]">
        <EditButton labelFor="section" onClick={() => editSection(id, name)}>
          Rename section
        </EditButton>

        <DeleteModal id={id} type="section" />
      </PopoverContent>
    </Popover>
  );
}

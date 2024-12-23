import PopoverButton from "@/components/popovers/popover-button";
import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import React from "react";
import EditButton from "@/components/popovers/edit-button";
import PopoverContainer from "./popover-container";

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
    <PopoverContainer
      trigger={<PopoverButton labelFor="Section" />}
      align="start"
      className="w-[12rem]"
    >
      <EditButton labelFor="section" onClick={() => editSection(id, name)}>
        Rename section
      </EditButton>

      <DeleteModal id={id} type="section" />
    </PopoverContainer>
  );
}

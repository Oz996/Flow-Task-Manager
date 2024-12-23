import EditButton from "./edit-button";
import PopoverButton from "./popover-button";
import PopoverContainer from "./popover-container";

interface ProjectPopoverProps {
  setIsEditing: (val: boolean) => void;
}

export default function ProjectPopover({ setIsEditing }: ProjectPopoverProps) {
  return (
    <PopoverContainer
      trigger={<PopoverButton labelFor="Project" />}
      align="start"
      className="w-[12rem]"
    >
      <EditButton labelFor="project" onClick={() => setIsEditing(true)}>
        Rename project
      </EditButton>
    </PopoverContainer>
  );
}

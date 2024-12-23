import DeleteModal from "../modals/delete-modal/delete-modal";
import EditButton from "./edit-button";
import PopoverButton from "./popover-button";
import PopoverContainer from "./popover-container";

interface ProjectPopoverProps {
  id: string;
  setIsEditing: (val: boolean) => void;
}

export default function ProjectPopover({
  setIsEditing,
  id,
}: ProjectPopoverProps) {
  return (
    <PopoverContainer
      trigger={<PopoverButton label="Project" />}
      align="start"
      className="w-[12rem]"
    >
      <EditButton onClick={() => setIsEditing(true)}>Rename project</EditButton>
      <DeleteModal id={id} type="Project" />
    </PopoverContainer>
  );
}

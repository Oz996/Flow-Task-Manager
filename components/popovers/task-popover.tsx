import PopoverButton from "@/components/popovers/popover-button";
import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import TaskModal from "@/components/modals/task-modal/task-modal";
import { Section } from "@/lib/types";
import PopoverContainer from "./popover-container";

interface TaskPopoverProps {
  sections: Section[];
  id: string;
}

export default function TaskPopover({ id, sections }: TaskPopoverProps) {
  return (
    <PopoverContainer
      trigger={<PopoverButton label="Task" />}
      align="start"
      className="w-[12rem]"
    >
      <TaskModal id={id} sections={sections} type="edit" />

      <DeleteModal id={id} type="Task" />
    </PopoverContainer>
  );
}

import PopoverButton from "@/components/popover-components/popover-button";
import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import TaskModal from "@/components/modals/task-modal/task-modal";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Section } from "@/lib/types";
import { useState } from "react";

interface TaskPopoverProps {
  sections: Section[];
  id: string;
}

export default function TaskPopover({ id, sections }: TaskPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <PopoverButton labelFor="Task" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12rem]">
        <>
          <TaskModal id={id} sections={sections} type="edit" />
        </>

        <>
          <DeleteModal id={id} type="task" />
        </>
      </PopoverContent>
    </Popover>
  );
}

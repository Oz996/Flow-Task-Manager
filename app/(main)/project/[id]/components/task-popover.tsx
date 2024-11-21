import DeleteModal from "@/components/modals/delete-modal/delete-modal";
import TaskModal from "@/components/modals/task-modal/task-modal";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { iconSize } from "@/lib/constants";
import { Section } from "@/lib/types";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

interface TaskPopoverProps {
  sections: Section[];
  id: string;
}

export default function TaskPopover({ id, sections }: TaskPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <button className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light">
          <Ellipsis size={iconSize} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12rem]">
        <div className="p-1 flex items-center gap-2 hover:bg-slate-200 duration-200 cursor-pointer">
          <TaskModal id={id} sections={sections} type="edit" />
        </div>
        <div className="p-1 flex items-center gap-2 text-red-500 hover:bg-slate-200 duration-200 cursor-pointer">
          <DeleteModal id={id} type="task" />
        </div>
      </PopoverContent>
    </Popover>
  );
}

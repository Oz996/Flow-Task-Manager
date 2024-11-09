import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useModal } from "@/hooks/useModal";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

interface TaskPopoverProps {
  iconSize: number;
  id: string;
}

export default function TaskPopover({ iconSize, id }: TaskPopoverProps) {
  const { openEditTaskModal, openDeleteTaskModal } = useModal();

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
          onClick={() => openEditTaskModal(id)}
        >
          <Pencil size={iconSize} />
          <span>Edit task</span>
        </div>
        <div
          className="p-1 flex items-center gap-2 text-red-500 hover:bg-slate-200 duration-200 cursor-pointer"
          onClick={() => openDeleteTaskModal(id)}
        >
          <Trash2 size={iconSize} />
          <span>Delete task</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

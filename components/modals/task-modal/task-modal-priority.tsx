import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorityOptions } from "@/lib/constants";
import { PriorityType } from "./task-modal-form";
import { Dispatch, SetStateAction } from "react";
import { Task } from "@/lib/types";

interface TaskModalPriorityProps {
  priority: PriorityType;
  setTask: Dispatch<SetStateAction<Task>>;
}

export default function TaskModalPriority({
  priority,
  setTask,
}: TaskModalPriorityProps) {
  function selectPriority(value: string) {
    setTask((taskData) => ({ ...taskData, priority: value as PriorityType }));
  }

  return (
    <div className="py-2">
      <Select value={priority ?? undefined} onValueChange={selectPriority}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Priority</SelectLabel>
            {priorityOptions.map((option) => (
              <SelectItem key={option.name} value={option.value as string}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

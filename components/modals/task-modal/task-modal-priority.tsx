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

interface TaskModalPriorityProps {
  priority: PriorityType;
  setPriority: Dispatch<SetStateAction<PriorityType>>;
}

export default function TaskModalPriority({
  priority,
  setPriority,
}: TaskModalPriorityProps) {
  console.log("prio", priority);

  function selectPriority(value: string) {
    setPriority(value as PriorityType);
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

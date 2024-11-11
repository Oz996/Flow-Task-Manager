import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskOrderOptions, taskSortOptions } from "@/lib/constants";
import { OrderType, SortOptionsType, SortType } from "@/lib/types";
import { ArrowUpDown, X } from "lucide-react";

interface TaskSortSelectProps {
  sortOptions: SortOptionsType;
  sortTasks: (type?: SortType) => void;
  sortTasksOrder: (order: OrderType) => void;
  iconSize: number;
}

export default function TaskSortSelect({
  sortOptions,
  sortTasks,
  sortTasksOrder,
  iconSize,
}: TaskSortSelectProps) {
  const { sort, order } = sortOptions;

  function handleSortChange(value: SortType) {
    sortTasks(value);
  }

  function handleOrderChange(value: OrderType) {
    sortTasksOrder(value);
  }

  return (
    <div className="flex gap-1 items-center">
      <ArrowUpDown size={iconSize} />

      {(sortOptions.sort !== "created" || sortOptions.order !== "asc") && (
        <button
          onClick={() => sortTasks()}
          aria-label="Reset task sorting"
          className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
        >
          <X size={iconSize} />
        </button>
      )}

      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger
          className="w-[7rem] capitalize"
          aria-label="Select sorting option"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>View mode</SelectLabel>
            {taskSortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="capitalize"
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={order} onValueChange={handleOrderChange}>
        <SelectTrigger
          className="w-[7.3rem] capitalize"
          aria-label="Select sorting order option"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>View mode</SelectLabel>
            {taskOrderOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="capitalize"
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

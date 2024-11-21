import TooltipContainer from "@/components/tooltip-container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iconSize, taskOrderOptions, taskSortOptions } from "@/lib/constants";
import { OrderType, SortOptionsType, SortType } from "@/lib/types";
import { ArrowUpDown, X } from "lucide-react";

interface TaskSortSelectProps {
  sortOptions: SortOptionsType;
  sortTasks: (type?: SortType) => void;
  sortTasksOrder: (order: OrderType) => void;
}

export default function TaskSortSelect({
  sortOptions,
  sortTasks,
  sortTasksOrder,
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

      {sortOptions.sort !== "" && (
        <TooltipContainer
          className="bg-main text-white"
          trigger={
            <button
              onClick={() => sortTasks("")}
              aria-label="Reset task sorting"
              className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            >
              <X size={iconSize} />
            </button>
          }
        >
          <p>Reset sorting</p>
        </TooltipContainer>
      )}

      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger
          className="w-[8rem] capitalize"
          aria-label="Select sorting option"
        >
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
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

      {sort && (
        <Select value={order} onValueChange={handleOrderChange}>
          <SelectTrigger
            className="w-[8rem] capitalize"
            aria-label="Select sorting order option"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort order</SelectLabel>
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
      )}
    </div>
  );
}

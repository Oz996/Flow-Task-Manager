import { FilterType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iconSize, taskFilterOptions } from "@/lib/constants";
import { ListFilter, X } from "lucide-react";
import TooltipContainer from "@/components/tooltip-container";
import { Dispatch, SetStateAction } from "react";

interface TaskFilterSelectProps {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
}

export default function TaskFilterSelect({
  filter,
  setFilter,
}: TaskFilterSelectProps) {
  function handleChange(value: FilterType) {
    setFilter(value);
  }

  return (
    <div className="flex gap-1 items-center">
      <ListFilter size={iconSize} />

      {filter && (
        <TooltipContainer
          className="bg-main text-white"
          trigger={
            <button
              onClick={() => setFilter("")}
              aria-label="Reset task sorting"
              className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            >
              <X size={iconSize} />
            </button>
          }
        >
          <p>Reset filter</p>
        </TooltipContainer>
      )}

      <Select value={filter} onValueChange={handleChange}>
        <SelectTrigger
          className="w-[8rem] capitalize"
          aria-label="Select filtering option"
        >
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter</SelectLabel>
            {taskFilterOptions.map((option) => (
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

"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewModeType } from "@/context/view-mode-context";
import { useViewMode } from "@/hooks/useViewMode";
import { viewModeOptions } from "@/lib/constants";

export default function LayoutSelect() {
  const { viewMode, setViewMode } = useViewMode();

  function handleViewMode(value: ViewModeType) {
    setViewMode(value);
  }

  return (
    <Select onValueChange={handleViewMode}>
      <SelectTrigger className="w-[5rem]">
        <SelectValue placeholder={viewMode} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>View mode</SelectLabel>
          {viewModeOptions.map((option) => (
            <SelectItem value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
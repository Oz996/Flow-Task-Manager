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
import { useViewMode } from "@/hooks/use-view-mode";
import { iconSize, viewModeOptions } from "@/lib/constants";
import { Grip } from "lucide-react";

export default function LayoutSelect() {
  const { viewMode, setViewMode } = useViewMode();

  function handleViewMode(value: ViewModeType) {
    setViewMode(value);
  }

  return (
    <div className="flex gap-1 items-center">
      <Grip size={iconSize} className="shrink-0" />

      <Select value={viewMode!} onValueChange={handleViewMode}>
        <SelectTrigger aria-label="Select layout view mode">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>View mode</SelectLabel>
            {viewModeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

import React from "react";
import { SortOptionsType, SortType } from "@/lib/types";
import { MoveDown, MoveUp, X } from "lucide-react";
import TooltipContainer from "@/components/tooltip-container";

interface TaskSortButtonsProps {
  sortOptions: SortOptionsType;
  sortTasks: (type?: SortType) => void;
  iconSize: number;
  type: SortType;
}

export default function TaskSortButtons({
  sortOptions,
  sortTasks,
  iconSize,
  type,
}: TaskSortButtonsProps) {
  const { sort, order } = sortOptions;

  function resetSorting() {
    sortTasks("");
  }

  return (
    <div className="flex items-center">
      {sort === type && (
        <TooltipContainer
          className="bg-main text-white"
          trigger={
            <button
              onClick={resetSorting}
              aria-label="Reset sorting"
              className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            >
              <X size={iconSize - 3} />
            </button>
          }
        >
          <p>Reset sorting</p>
        </TooltipContainer>
      )}

      <TooltipContainer
        className="bg-main text-white"
        trigger={
          <button
            onClick={() => sortTasks(type)}
            aria-label={`Sort by ${type}`}
            className="flex items-center gap-1 p-1 text-main-light bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
          >
            {sort !== type || (sort === type && order === "asc") ? (
              <MoveDown size={iconSize - 2} />
            ) : (
              sort === type &&
              order === "desc" && <MoveUp size={iconSize - 2} />
            )}
          </button>
        }
      >
        <p>{`Sort by ${type}`}</p>
      </TooltipContainer>
    </div>
  );
}

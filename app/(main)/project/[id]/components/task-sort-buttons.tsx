import React from "react";
import { SortOptionsType, SortType } from "./list-view";
import { MoveDown, MoveUp, X } from "lucide-react";

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
    sortTasks();
  }

  return (
    <div className="flex items-center">
      {sort === type && (
        <button
          onClick={resetSorting}
          className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
        >
          <X size={iconSize - 3} />
        </button>
      )}

      <button
        onClick={() => sortTasks(type)}
        className="flex items-center gap-1 p-1 text-main-light bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
      >
        {sort !== type || (sort === type && order === "asc") ? (
          <MoveDown size={iconSize - 2} />
        ) : (
          sort === type && order === "desc" && <MoveUp size={iconSize - 2} />
        )}
      </button>
    </div>
  );
}

import { updateSubtaskAction } from "@/app/(main)/actions";
import { Subtask, Task } from "@/lib/types";
import classNames from "classnames";
import { CheckCircle2, ChevronRight, List } from "lucide-react";
import React, { useState } from "react";

interface TaskSubtasksProps {
  subtasks: Subtask[];
  iconSize: number;
}

export default function TaskSubtasks({
  subtasks,
  iconSize,
}: TaskSubtasksProps) {
  const [expanded, setExpanded] = useState(false);

  function sortByDate() {
    const subtasksCopy = [...subtasks];
    return subtasksCopy.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }

  return (
    <>
      <div className="self-end mt-auto">
        {subtasks.length > 0 && (
          <button
            className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="text-sm">{subtasks.length}</span>
            <List size={iconSize} />
            <ChevronRight
              size={iconSize}
              className={classNames({
                "transition-transform ease-in-out rotate-0": true,
                "rotate-90": expanded,
              })}
            />
          </button>
        )}
      </div>
      <div>
        {expanded && (
          <ul>
            {sortByDate()?.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateSubtaskAction(subtask.completed, subtask.id)
                  }
                >
                  <CheckCircle2
                    strokeWidth={1}
                    size={iconSize + 2}
                    className={subtask.completed ? "text-green-600" : ""}
                  />
                </button>
                <span>{subtask.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

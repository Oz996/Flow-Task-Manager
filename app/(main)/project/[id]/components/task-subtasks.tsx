import { subtaskCompletedAction } from "@/app/(main)/actions";
import { Subtask } from "@/lib/types";
import classNames from "classnames";
import { ChevronRight, List } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

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
              <li
                key={subtask.id}
                className="flex items-center gap-2 py-2 text-sm border-b border-b-gray-200"
              >
                <button
                  onClick={() =>
                    subtaskCompletedAction(subtask.completed, subtask.id)
                  }
                >
                  <Image
                    width={10}
                    height={10}
                    src={
                      subtask.completed
                        ? "/check-circle-green.svg"
                        : "/check-circle.svg"
                    }
                    alt="Checkmark for subtask"
                    aria-label={
                      subtask.completed
                        ? "Uncheck completed"
                        : "Check completed"
                    }
                    className="size-[1.35rem]"
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

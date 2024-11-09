import { subtaskCompletedAction } from "@/app/(main)/actions";
import { Subtask } from "@/lib/types";
import classNames from "classnames";
import { ChevronRight, List } from "lucide-react";
import { startTransition, useOptimistic, useState } from "react";
import Image from "next/image";

interface TaskSubtasksProps {
  subtasks: Subtask[];
  iconSize: number;
  listView?: boolean;
}

export default function TaskSubtasks({
  subtasks,
  iconSize,
  listView,
}: TaskSubtasksProps) {
  const [optimisticSubtasks, addOptimisticSubtask] = useOptimistic(
    sortByDate(subtasks),
    toggleCompleted
  );
  const [expanded, setExpanded] = useState(false);

  function sortByDate(subtasks: Subtask[]) {
    const subtasksCopy = [...subtasks];
    return subtasksCopy.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }

  function toggleCompleted(state: Subtask[], id: string) {
    return state.map((subtask) => {
      return subtask.id === id
        ? { ...subtask, completed: !subtask.completed }
        : subtask;
    });
  }

  // use of useOptimistic to instantly display change to user while running the async action in the background
  async function subtaskAction(subtask: Subtask) {
    startTransition(() => {
      addOptimisticSubtask(subtask.id);
    });

    await subtaskCompletedAction(subtask.completed, subtask.id);
  }

  return (
    <>
      <div className={`${listView ? "" : "ml-auto"}`}>
        {subtasks.length > 0 && !listView && (
          <button
            aria-label="Expand task card to display subtasks"
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
      <div
        className={classNames({
          "col-span-2": true,
          "mt-3": !listView,
        })}
      >
        {(expanded || listView) && (
          <ul>
            {optimisticSubtasks.map((subtask) => (
              <li
                key={subtask.id}
                className={classNames({
                  "flex items-center gap-2 py-2 text-sm": true,
                  "border-b border-b-gray-200": true,
                })}
              >
                <button
                  aria-label={
                    subtask.completed
                      ? "Mark subtask as incomplete"
                      : "Mark subtask as complete"
                  }
                  onClick={() => subtaskAction(subtask)}
                >
                  <Image
                    width={10}
                    height={10}
                    src={
                      subtask.completed
                        ? "/check-circle-green.svg"
                        : "/check-circle.svg"
                    }
                    alt=""
                    className="min-w-[1.35rem] min-h-[1.35rem]"
                  />
                </button>
                <span
                  title={subtask.name.length > 50 ? subtask.name : undefined}
                  className="line-clamp-2"
                >
                  {subtask.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

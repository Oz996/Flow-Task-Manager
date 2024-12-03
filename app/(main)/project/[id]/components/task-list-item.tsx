"use client";
import { Section, Task } from "@/lib/types";
import classNames from "classnames";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import { startTransition, useOptimistic, useState } from "react";
import { taskCompletedAction } from "@/app/(main)/actions";
import TaskPopover from "./task-popover";
import UserAvatar from "./user-avatar";
import TaskPriority from "./task-priority";
import TaskLabel from "./task-label";
import { iconSize } from "@/lib/constants";
import TaskProjectInfo from "./task-project-info";

interface TaskListItemProps {
  task: Task;
  sections?: Section[];
  homeList?: boolean;
}

export default function TaskListItem({
  task,
  sections,
  homeList,
}: TaskListItemProps) {
  const [openTasks, setOpenTasks] = useState(new Map<string, string>());
  const [optimisticTask, addOptimisticTask] = useOptimistic(
    task,
    toggleCompleted
  );

  function toggleCompleted(state: Task) {
    return { ...state, completed: !state.completed };
  }

  function expandTask(id: string) {
    const updatedMap = new Map(openTasks);

    if (updatedMap.has(id)) {
      updatedMap.delete(id);
    } else {
      updatedMap.set(id, id);
    }
    setOpenTasks(updatedMap);
  }

  async function taskAction(task: Task) {
    startTransition(() => {
      addOptimisticTask(task);
    });

    await taskCompletedAction(task.completed, task.id);
  }

  return (
    <li
      key={task.id}
      className={classNames({
        "flex flex-col text-sm duration-200 first:border-t": true,
        "opacity-75": optimisticTask.completed,
      })}
    >
      <div className="grid grid-cols-5">
        <div className="flex items-center gap-2 relative col-span-2 border-b border-r p-1">
          {task.subtasks.length > 0 && (
            <button
              onClick={() => expandTask(task.id)}
              aria-controls="subtasks"
              aria-label="Expand task item to display subtasks"
              className="flex items-center gap-1 absolute p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            >
              <ChevronRight
                size={iconSize}
                className={classNames({
                  "transition-transform ease-in-out rotate-0": true,
                  "rotate-90": openTasks.has(task.id),
                })}
              />
            </button>
          )}
          <div className={`flex items-center ${!homeList && "ml-[1.85rem]"}`}>
            <button
              aria-label={
                optimisticTask.completed
                  ? "Mark task as incomplete"
                  : "Mark task as complete"
              }
              onClick={() => taskAction(task)}
            >
              <Image
                width={10}
                height={10}
                src={
                  optimisticTask.completed
                    ? "/check-circle-green.svg"
                    : "/check-circle.svg"
                }
                alt=""
                className="min-w-[1.35rem] min-h-[1.35rem]"
              />
            </button>
          </div>
          <span
            title={task.name.length > 50 ? task.name : undefined}
            className="line-clamp-2"
          >
            {task.name}
          </span>

          {sections && (
            <div className="ml-auto">
              <TaskPopover id={task.id} sections={sections} />
            </div>
          )}
        </div>

        {homeList && task.section && (
          <div className="flex items-center border-b border-r p-1">
            <TaskProjectInfo project={task.section.project} />
          </div>
        )}

        {!homeList && (
          <div className="flex items-center gap-2 border-b border-r p-1">
            {task.profiles.map((user) => (
              <UserAvatar key={user.id} user={user} small />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 border-b border-r p-1">
          <TaskPriority priority={task.priority} />
        </div>

        <div className="flex items-center gap-2 border-b p-1">
          {task.labels.map((label) => (
            <TaskLabel key={label.id} label={label} />
          ))}
        </div>
      </div>

      {openTasks.has(task.id) && (
        <div className="pl-12">
          <TaskSubtasks subtasks={task.subtasks} listView />
        </div>
      )}
    </li>
  );
}

import { Task } from "@/lib/types";
import classNames from "classnames";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import { startTransition, useOptimistic } from "react";
import { taskCompletedAction } from "@/app/(main)/actions";
import TaskPopover from "./task-popover";
import UserAvatar from "./user-avatar";
import TaskPriority from "./task-priority";
import TaskLabel from "./task-label";

interface TaskListItemProps {
  task: Task;
  expandTask: (id: string) => void;
  openTasks: Map<string, string>;
  iconSize: number;
}

export default function TaskListItem({
  task,
  iconSize,
  expandTask,
  openTasks,
}: TaskListItemProps) {
  const [optimisticTask, addOptimisticTask] = useOptimistic(
    task,
    toggleCompleted
  );

  function toggleCompleted(state: Task) {
    return { ...state, completed: !state.completed };
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
        "flex flex-col text-sm duration-200": true,
        "opacity-75": optimisticTask.completed,
      })}
    >
      <div className="grid grid-cols-5">
        <div className="flex items-center gap-2 relative col-span-2 border p-1">
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
          <div className="ml-[1.85rem] flex items-center">
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
          <div className="ml-auto">
            <TaskPopover id={task.id} iconSize={iconSize} />
          </div>
        </div>

        <div className="flex items-center gap-2 border p-1">
          {task.profiles.map((user) => (
            <UserAvatar key={user.id} user={user} small />
          ))}
        </div>

        <div className="flex items-center gap-2 border p-1">
          <TaskPriority priority={task.priority} />
        </div>

        <div className="flex items-center gap-2 border p-1">
          {task.labels.map((label) => (
            <TaskLabel key={label.id} label={label} />
          ))}
        </div>
      </div>

      {openTasks.has(task.id) && (
        <div className="grid grid-cols-5">
          <div className="col-span-2 pl-12">
            <TaskSubtasks
              subtasks={task.subtasks}
              iconSize={iconSize}
              listView
            />
          </div>
        </div>
      )}
    </li>
  );
}

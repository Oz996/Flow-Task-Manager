import TooltipContainer from "@/components/tooltip-container";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import TaskPopover from "./task-popover";
import { startTransition, useOptimistic } from "react";
import { taskCompletedAction } from "@/app/(main)/actions";
import classNames from "classnames";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [optimisticTask, addOptimisticTask] = useOptimistic(
    task,
    toggleCompleted
  );
  const iconSize = 18;
  console.log("task", task);

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
    <Card
      className={classNames({
        "flex flex-col gap-5 p-4 min-h-[8rem] rounded-lg duration-200": true,
        "opacity-75": optimisticTask.completed,
      })}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <button
            aria-label="Mark task as complete"
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
              alt="Checkmark for task"
              aria-label={
                optimisticTask.completed
                  ? "Uncheck completed"
                  : "Check completed"
              }
              className="size-[1.35rem]"
            />
          </button>
          <span>{task.name}</span>
        </div>
        <TaskPopover iconSize={iconSize} id={task.id} />
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        {task?.priority && (
          <TooltipContainer
            className="bg-main text-white capitalize"
            trigger={
              <span
                className={classNames({
                  "px-2 py-1 text-sm rounded capitalize": true,
                  "bg-blue-300": task.priority === "low",
                  "bg-yellow-500": task.priority === "medium",
                  "bg-red-500": task.priority === "high",
                })}
              >
                {task.priority}
              </span>
            }
          >
            <div className="flex flex-col gap-1">
              <p>Priority:</p>
              <p> {task.priority}</p>
            </div>
          </TooltipContainer>
        )}

        {task.labels &&
          task.labels.map((label) => (
            <TooltipContainer
              className="bg-main text-white capitalize"
              trigger={
                <span
                  key={label.id}
                  className="px-2 py-1 text-sm rounded-sm border border-l-2 border-l-black"
                >
                  {label.name}
                </span>
              }
            >
              <div className="flex flex-col gap-1">
                <p>Label:</p>
                <p> {label.name}</p>
              </div>
            </TooltipContainer>
          ))}
      </div>

      <div className="grid grid-cols-2 justify-between">
        <div className="flex gap-2">
          {task.profiles &&
            task.profiles.map((user) => (
              <TooltipContainer
                className="bg-main text-white"
                trigger={
                  <Image
                    width={100}
                    height={100}
                    src={user.avatar_url}
                    alt="User avatar"
                    className="size-7 rounded-full"
                  />
                }
              >
                <p>{user.username}</p>
              </TooltipContainer>
            ))}
        </div>
        <TaskSubtasks iconSize={iconSize} subtasks={task.subtasks} />
      </div>
    </Card>
  );
}

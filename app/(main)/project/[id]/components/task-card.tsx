import TooltipContainer from "@/components/tooltip-container";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import SubtasksPopover from "./subtasks-popover";
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
    return { ...state, completed: !state.completed } as Task;
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
        "flex flex-col gap-2 p-4 min-h-[8rem] rounded-lg duration-200": true,
        "opacity-75": optimisticTask.completed,
      })}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => taskAction(task)}>
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
        <SubtasksPopover iconSize={iconSize} id={task.id} />
      </div>
      <div className="flex gap-2">
        {task?.task_assignments?.map((user) => (
          <TooltipContainer
            className="bg-main text-white"
            trigger={
              <Image
                width={100}
                height={100}
                src={user.profiles.avatar_url}
                alt="User avatar"
                className="size-7 rounded-full"
              />
            }
          >
            <p>{user.profiles.username}</p>
          </TooltipContainer>
        ))}
      </div>
      <TaskSubtasks iconSize={iconSize} subtasks={task?.subtasks!} />
    </Card>
  );
}

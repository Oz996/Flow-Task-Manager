import { Card } from "@/components/ui/card";
import { Section, Task } from "@/lib/types";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import TaskPopover from "../../../../../components/popovers/task-popover";
import { startTransition, useOptimistic } from "react";
import classNames from "classnames";
import UserAvatar from "./user-avatar";
import TaskPriority from "./task-priority";
import TaskLabel from "./task-label";
import { taskCompletedAction } from "@/app/actions/task-actions";

interface TaskCardProps {
  task: Task;
  sections: Section[];
}

export default function TaskCard({ task, sections }: TaskCardProps) {
  const [optimisticTask, addOptimisticTask] = useOptimistic(
    task,
    toggleCompleted
  );
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
        <TaskPopover id={task.id} sections={sections} />
      </div>

      {(task.priority || task.labels.length > 0) && (
        <div className="flex gap-2 items-center flex-wrap">
          {<TaskPriority priority={task.priority} />}

          {task.labels.map((label) => (
            <TaskLabel key={label.id} label={label} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 justify-between">
        <div className="flex gap-2">
          {task.profiles.map((user) => (
            <UserAvatar key={user.id} user={user} />
          ))}
        </div>
        <TaskSubtasks subtasks={task.subtasks} />
      </div>
    </Card>
  );
}

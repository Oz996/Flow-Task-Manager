import TooltipContainer from "@/components/tooltip-container";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import TaskSubtasks from "./task-subtasks";
import SubtasksPopover from "./subtasks-popover";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const iconSize = 18;
  console.log("task", task);

  return (
    <Card className="flex flex-col gap-2 p-4 min-h-[8rem] rounded-lg duration-200">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <button>
            <CheckCircle2
              strokeWidth={1}
              size={iconSize + 2}
              className={true ? "text-green-600" : ""}
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

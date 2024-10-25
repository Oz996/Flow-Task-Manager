import { updateSubtaskAction } from "@/app/(main)/actions";
import TooltipContainer from "@/components/tooltip-container";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";
import classNames from "classnames";
import {
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ListTree,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  const iconSize = 18;
  console.log("task", task);

  function sortByDate() {
    const subtasks = [...task?.subtasks!];
    return subtasks.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }

  return (
    <Card className="flex flex-col gap-2 p-4 min-h-[8rem] rounded-lg duration-200">
      <div>
        <p>{task.name}</p>
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
      <div className="self-end mt-auto">
        {task.subtasks && task.subtasks.length > 0 && (
          <button
            className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="text-sm">{task.subtasks?.length}</span>
            <ListTree size={iconSize} />
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
            {task.subtasks &&
              sortByDate()?.map((subtask) => (
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
    </Card>
  );
}

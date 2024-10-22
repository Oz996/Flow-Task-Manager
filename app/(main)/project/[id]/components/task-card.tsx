import TooltipContainer from "@/components/tooltip-container";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { ChevronRight, ListTree } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  console.log("task", task);

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
                width={50}
                height={50}
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
            <ListTree size={18} />
            <ChevronRight
              size={18}
              className={`${expanded ? "animate-accordion-down" : ""}`}
            />
          </button>
        )}
      </div>
      <div>
        {expanded && (
          <ul>
            {task.subtasks &&
              task.subtasks.map((subtask) => (
                <li key={subtask.id}>{subtask.name}</li>
              ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

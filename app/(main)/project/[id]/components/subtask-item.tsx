import { Subtask } from "@/lib/types";
import Image from "next/image";

interface SubtaskItemProps {
  subtask: Subtask;
  subtaskAction: (subtask: Subtask) => Promise<void>;
}

export default function SubtaskItem({
  subtask,
  subtaskAction,
}: SubtaskItemProps) {
  return (
    <li
      key={subtask.id}
      className="flex items-center gap-2 py-2 text-sm border-b border-main-border"
    >
      <button
        aria-label="Mark subtask as complete"
        onClick={() => subtaskAction(subtask)}
      >
        <Image
          width={10}
          height={10}
          src={
            subtask.completed ? "/check-circle-green.svg" : "/check-circle.svg"
          }
          alt="Checkmark for subtask"
          aria-label={
            subtask.completed ? "Uncheck completed" : "Check completed"
          }
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
  );
}

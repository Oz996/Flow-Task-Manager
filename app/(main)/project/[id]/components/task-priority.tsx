import TooltipContainer from "@/components/tooltip-container";
import { PriorityType } from "@/lib/types";
import classNames from "classnames";

interface TaskPriorityProps {
  priority: PriorityType;
}

export default function TaskPriority({ priority }: TaskPriorityProps) {
  if (priority)
    return (
      <TooltipContainer
        className="bg-main text-white capitalize"
        trigger={
          <span
            className={classNames({
              "px-2 py-1 text-sm rounded capitalize": true,
              "bg-blue-300": priority === "low",
              "bg-yellow-500": priority === "medium",
              "bg-red-500": priority === "high",
            })}
          >
            {priority}
          </span>
        }
      >
        <div className="flex flex-col gap-1">
          <p>Priority:</p>
          <p>{priority}</p>
        </div>
      </TooltipContainer>
    );
}

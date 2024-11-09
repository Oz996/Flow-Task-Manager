import TooltipContainer from "@/components/tooltip-container";
import { Label } from "@/lib/types";

interface TaskLabelProps {
  label: Label;
}

export default function TaskLabel({ label }: TaskLabelProps) {
  return (
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
        <p>{label.name}</p>
      </div>
    </TooltipContainer>
  );
}

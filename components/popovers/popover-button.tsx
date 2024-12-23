import { iconSize } from "@/lib/constants";
import { Ellipsis } from "lucide-react";
import { forwardRef } from "react";

interface PopoverButtonProps {
  label: "Project" | "Section" | "Task";
}

const PopoverButton = forwardRef<HTMLButtonElement, PopoverButtonProps>(
  ({ label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        aria-label={`${label} options`}
        className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light"
      >
        <Ellipsis size={iconSize} />
      </button>
    );
  }
);

export default PopoverButton;

import { iconSize } from "@/lib/constants";
import { Pencil } from "lucide-react";
import React, { forwardRef, ReactNode } from "react";

interface EditButtonProps {
  labelFor: "project" | "section" | "task";
  children: ReactNode;
  onClick?: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ labelFor, children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        onClick={onClick}
        aria-label={`Edit ${labelFor}`}
        className="flex items-center gap-2 p-1 w-full hover:bg-slate-200 duration-200 cursor-pointer"
      >
        <Pencil size={iconSize} />
        {children}
      </button>
    );
  }
);

export default EditButton;

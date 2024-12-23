import { iconSize } from "@/lib/constants";
import { Pencil } from "lucide-react";
import React, { forwardRef, ReactNode } from "react";

interface EditButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        onClick={onClick}
        className="flex items-center gap-2 p-1 w-full hover:bg-slate-200 duration-200 cursor-pointer"
      >
        <Pencil size={iconSize} />
        {children}
      </button>
    );
  }
);

export default EditButton;

import { iconSize } from "@/lib/constants";
import { Trash2 } from "lucide-react";
import { forwardRef, ReactNode } from "react";

interface DeleteButtonProps {
  children: ReactNode;
}

const DeleteButton = forwardRef<HTMLButtonElement, DeleteButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className="flex items-center gap-2 p-1 w-full text-red-500 hover:bg-slate-200 duration-200 cursor-pointer"
      >
        <Trash2 size={iconSize} />
        {children}
      </button>
    );
  }
);

export default DeleteButton;

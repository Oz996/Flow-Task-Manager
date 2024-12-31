import { iconSize } from "@/lib/constants";
import { Pencil } from "lucide-react";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function EditButton({ children, ...props }: EditButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 py-1 px-2 w-full hover:bg-slate-200 dark:hover:bg-main duration-200 cursor-pointer"
    >
      <Pencil size={iconSize} />
      {children}
    </button>
  );
}

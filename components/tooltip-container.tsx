import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipType
  extends React.ComponentPropsWithoutRef<typeof TooltipContent> {
  trigger: ReactNode;
  children: ReactNode;
}

export default function TooltipContainer({
  trigger,
  children,
  ...props
}: TooltipType) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent asChild {...props}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

"use client";
import { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverType
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  trigger: ReactNode;
  children: ReactNode;
}

export default function PopoverContainer({
  trigger,
  children,
  ...props
}: PopoverType) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent {...props}>{children}</PopoverContent>
    </Popover>
  );
}

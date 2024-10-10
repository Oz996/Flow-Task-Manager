import { Label } from "@/components/ui/label";
import React, { LabelHTMLAttributes, ReactNode } from "react";

interface LabelType extends React.LabelHTMLAttributes<"label"> {
  children: ReactNode;
}

export default function RequiredLabel({ children }: LabelType) {
  return (
    <Label>
      {children}
      <span className="text-red-500 ml-1">*</span>
    </Label>
  );
}

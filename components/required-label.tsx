import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

interface LabelType extends React.LabelHTMLAttributes<"label"> {
  children: ReactNode;
}

export default function RequiredLabel({ children, htmlFor }: LabelType) {
  return (
    <Label htmlFor={htmlFor}>
      {children}
      <span className="text-red-500 ml-1">*</span>
    </Label>
  );
}

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface RemoveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function RemoveButton({ ...props }: RemoveButtonProps) {
  return (
    <Button
      {...props}
      type="button"
      className="bg-transparent hover:bg-transparent px-1 py-2 text-main-light"
    >
      <X />
    </Button>
  );
}

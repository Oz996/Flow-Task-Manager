"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button>;

interface SubmitButtonProps extends Props {
  loader?: boolean;
}

export function SubmitButton({
  children,
  loader,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {pending && loader ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}

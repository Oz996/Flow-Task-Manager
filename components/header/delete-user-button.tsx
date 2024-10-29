"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { UserObject } from "@/lib/types";

interface DeleteUserButtonProps {
  user: UserObject;
}

export default function DeleteUserButton({ user }: DeleteUserButtonProps) {
  const { openDeleteUserModal } = useModal();

  console.log("usee", user);

  return (
    <Button
      className="rounded-lg text-red-500 border-red-300 hover:text-red-300 duration-200"
      variant="outline"
      onClick={() => openDeleteUserModal(user?.id as string)}
    >
      Delete user
    </Button>
  );
}

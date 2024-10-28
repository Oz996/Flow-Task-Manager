"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";

export default function EditUserButton() {
  const { openEditUserModal } = useModal();
  return (
    <Button className="rounded-lg" onClick={openEditUserModal}>
      Edit user
    </Button>
  );
}

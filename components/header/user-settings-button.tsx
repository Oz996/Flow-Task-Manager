"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";

export default function UserSettingsButton() {
  const { openEditUserModal } = useModal();
  return (
    <Button className="rounded-lg" onClick={openEditUserModal}>
      User settings
    </Button>
  );
}

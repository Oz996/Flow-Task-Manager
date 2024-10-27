"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ModalButton() {
  const { openCreateProjectModal } = useModal();
  const iconSize = 18;

  return (
    <Button
      className="px-1 py-3 h-5 text-white bg-transparent hover:bg-main-light duration-200"
      onClick={openCreateProjectModal}
    >
      <Link href="">
        <Plus size={iconSize} />
      </Link>
    </Button>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/hooks/useLocation";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ModalButton() {
  const { openAddModal } = useLocation();
  const iconSize = 18;

  return (
    <Button
      className="px-1 py-3 h-5 bg-transparent hover:bg-main-light duration-200"
      onClick={openAddModal}
    >
      <Link href="">
        <Plus size={iconSize} />
      </Link>
    </Button>
  );
}

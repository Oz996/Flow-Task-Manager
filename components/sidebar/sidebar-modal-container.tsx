"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

export default function SidebarModalContainer({
  children,
}: {
  children: ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <button
          aria-controls="sidebar"
          aria-label="Open modal"
          className="p-2 text-white hover:bg-transparent/20 duration-200 rounded-lg"
        >
          <Menu size={22} />
        </button>
      </DialogTrigger>
      {children}
    </Dialog>
  );
}

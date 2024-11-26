"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectModalForm from "./project-modal-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { iconSize } from "@/lib/constants";

interface ProjectModalProps {
  type: "add" | "edit";
}

export default function ProjectModal({ type }: ProjectModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="px-1 py-3 h-5 text-white bg-transparent hover:bg-main-light duration-200">
          <Plus size={iconSize} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem] p-8">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Create Project" : "Edit Project"}
          </DialogTitle>
        </DialogHeader>
        <ProjectModalForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskModalForm from "./task-modal-form";
import { Section } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { flushSync } from "react-dom";
import { iconSize } from "@/lib/constants";
import EditButton from "@/components/popovers/edit-button";

interface TaskModalProps {
  id: string;
  type: "add" | "edit";
  sections: Section[];
  listView?: boolean;
}

export default function TaskModal({
  id,
  type,
  sections,
  listView,
}: TaskModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    flushSync(() => setModalOpen(false));
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <EditButton labelFor="task">Edit task</EditButton>
        ) : type === "add" && listView ? (
          <button
            aria-label="Create task"
            className="border-none ml-[1.85rem] p-1 text-sm text-main-light"
          >
            Add task...
          </button>
        ) : (
          <button
            aria-label="Create task"
            className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light"
          >
            <Plus size={iconSize} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem] p-8">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Create Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskModalForm
          addModal={type === "add"}
          sections={sections}
          id={id}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

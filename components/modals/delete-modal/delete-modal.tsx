"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import DeleteButton from "./delete-button";
import { deleteTaskAction } from "@/app/actions/task-actions";
import { deleteSectionAction } from "@/app/actions/section-actions";
import { deleteProjectAction } from "@/app/actions/project-actions";
import { deleteUserAction } from "@/app/(auth)/actions";

interface DeleteModalProps {
  id: string;
  type: "Project" | "Section" | "Task" | "User";
}

export default function DeleteModal({ id, type }: DeleteModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  async function deleteToast(fn: (id: string) => Promise<void>, id: string) {
    return toast.promise(fn(id), {
      loading: "Loading...",
      success: `${type} deleted`,
      error: `Failed to delete ${type.toLowerCase()}, try again later`,
    });
  }

  async function deleteAction() {
    closeModal();
    switch (type) {
      case "Task": {
        return await deleteToast(deleteTaskAction, id);
      }
      case "Section": {
        return await deleteToast(deleteSectionAction, id);
      }
      case "Project": {
        return await deleteToast(deleteProjectAction, id);
      }
      default: {
        return await deleteToast(deleteUserAction, id);
      }
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {type === "User" ? (
          <Button
            className="rounded-lg text-red-500 border-red-300 hover:text-red-300 duration-200"
            variant="outline"
          >
            Delete user
          </Button>
        ) : type === "Task" ? (
          <DeleteButton>Delete task</DeleteButton>
        ) : type === "Section" ? (
          <DeleteButton>Delete section</DeleteButton>
        ) : (
          <DeleteButton>Delete project</DeleteButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[20rem] p-0 space-y-2">
        <DialogHeader className="border-b border-border">
          <DialogTitle className="px-4 py-6 capitalize">{`Delete ${type}?`}</DialogTitle>
        </DialogHeader>
        <p className="px-4">This action is irreversible</p>
        <DialogFooter className="border-t border-border">
          <div className="flex gap-2 p-4">
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={deleteAction}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

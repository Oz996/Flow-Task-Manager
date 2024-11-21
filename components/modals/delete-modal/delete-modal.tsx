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
import { deleteSectionAction, deleteTaskAction } from "@/app/(main)/actions";
import { deleteUserAction } from "@/app/(auth)/actions";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { iconSize } from "@/lib/constants";

interface DeleteModalProps {
  id: string;
  type: "task" | "section" | "user";
}

export default function DeleteModal({ id, type }: DeleteModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  type DeleteType = "Task" | "Section" | "User";

  async function deleteToast(
    fn: (id: string) => Promise<void>,
    id: string,
    type: DeleteType
  ) {
    return toast.promise(fn(id), {
      loading: "Loading...",
      success: `${type} deleted`,
      error: `Failed to delete ${type.toLowerCase()}, try again later`,
    });
  }

  async function deleteAction() {
    closeModal();
    if (type === "task") await deleteToast(deleteTaskAction, id, "Task");
    else if (type === "section")
      await deleteToast(deleteSectionAction, id, "Section");
    else await deleteToast(deleteUserAction, id, "User");
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {type === "user" ? (
          <Button
            className="rounded-lg text-red-500 border-red-300 hover:text-red-300 duration-200"
            variant="outline"
          >
            Delete user
          </Button>
        ) : (
          <div className="flex gap-2">
            <Trash2 size={iconSize} />
            <span>Delete task</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[20rem] p-0 space-y-2">
        <DialogHeader className="border-b border-gray-200">
          <DialogTitle className="px-4 py-6">
            {type === "task"
              ? "Delete Task?"
              : type === "section"
                ? "Delete Section?"
                : "Delete User?"}
          </DialogTitle>
        </DialogHeader>
        <p className="px-4">This action is irreversible</p>
        <DialogFooter className="border-t border-gray-200">
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

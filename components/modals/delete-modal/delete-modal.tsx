"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ModalContainer from "../modal-container";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { deleteSectionAction, deleteTaskAction } from "@/app/(main)/actions";
import { useModal } from "@/hooks/useModal";
import { deleteUserAction } from "@/app/(auth)/actions";

export default function DeleteModal() {
  const searchParams = useSearchParams();
  const { closeModal } = useModal();

  const type = searchParams.get("type");
  const action = searchParams.get("action");

  const taskModal = type === "task";
  const sectionModal = type === "section";

  const deleteModal = action === "delete";
  const id = searchParams.get("id") as string;

  async function deleteAction() {
    if (taskModal) await deleteTaskAction(id);
    else if (sectionModal) await deleteSectionAction(id);
    else await deleteUserAction(id);
    closeModal();
  }

  if (deleteModal)
    return (
      <ModalContainer>
        <DialogContent className="sm:max-w-[20rem] p-0 space-y-2">
          <DialogHeader className="border-b border-gray-200">
            <DialogTitle className="px-4 py-6">
              {taskModal
                ? "Delete Task?"
                : sectionModal
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
      </ModalContainer>
    );
}

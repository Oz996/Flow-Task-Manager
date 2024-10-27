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
        <DialogContent className="sm:max-w-[20rem] p-8 space-y-2">
          <DialogHeader>
            <DialogTitle>
              {taskModal
                ? "Delete Task?"
                : sectionModal
                  ? "Delete Section?"
                  : "Delete User?"}
            </DialogTitle>
          </DialogHeader>
          <p>This action is irreversible</p>
          <DialogFooter className="flex gap-2">
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
          </DialogFooter>
        </DialogContent>
      </ModalContainer>
    );
}

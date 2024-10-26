"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ModalContainer from "../modal-container";
import { useSearchParams } from "next/navigation";
import TaskModalForm from "./task-modal-form";

export default function TaskModal() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const action = searchParams.get("action");

  const taskModal = type === "task";
  const addModal = action === "add";
  const editModal = action === "edit";

  if ((taskModal && addModal) || (taskModal && editModal))
    return (
      <ModalContainer>
        <DialogContent className="sm:max-w-[30rem] p-8">
          <DialogHeader>
            <DialogTitle>{addModal ? "Create Task" : "Edit Task"}</DialogTitle>
          </DialogHeader>
          <TaskModalForm addModal={addModal} />
        </DialogContent>
      </ModalContainer>
    );
}

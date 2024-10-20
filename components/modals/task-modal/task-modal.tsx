"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ModalContainer from "../modal-container";
import { useSearchParams } from "next/navigation";

export default function TaskModal() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const action = searchParams.get("action");

  const taskModal = type === "task";
  const addModal = action === "add";

  if (taskModal)
    return (
      <ModalContainer>
        <DialogContent className="sm:max-w-[30rem] p-8">
          <DialogHeader>
            <DialogTitle>{addModal ? "Create Task" : "Edit Task"}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </ModalContainer>
    );
}

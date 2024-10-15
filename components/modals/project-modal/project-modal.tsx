"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import ModalContainer from "./modal-container";
import ProjectModalForm from "./project-modal-form";

export default function ProjectModal() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const addModal = type === "add";

  return (
    <ModalContainer>
      <DialogContent className="sm:max-w-[30rem] p-8">
        <DialogHeader>
          <DialogTitle>
            {addModal ? "Create Project" : "Edit Project"}
          </DialogTitle>
        </DialogHeader>
        <ProjectModalForm />
      </DialogContent>
    </ModalContainer>
  );
}

"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import ModalContainer from "../modal-container";
import ProjectModalForm from "./project-modal-form";

export default function ProjectModal() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const action = searchParams.get("action");

  const projectModal = type === "project";
  const addModal = action === "add";

  if (projectModal)
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

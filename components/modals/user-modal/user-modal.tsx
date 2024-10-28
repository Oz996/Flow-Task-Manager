"use client";
import ModalContainer from "../modal-container";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { UserObject } from "@/lib/types";
import UserModalForm from "./user-modal-form";

interface UserModalProps {
  user: UserObject;
}

export default function UserModal({ user }: UserModalProps) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const action = searchParams.get("action");

  const userModal = type === "user";
  const editModal = action === "edit";

  if (userModal && editModal)
    return (
      <ModalContainer>
        <DialogContent className="sm:max-w-[30rem] p-8">
          <DialogHeader>
            <DialogTitle>User settings</DialogTitle>
          </DialogHeader>
          <UserModalForm user={user} />
        </DialogContent>
      </ModalContainer>
    );
}

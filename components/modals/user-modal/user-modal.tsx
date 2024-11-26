"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserModalForm from "./user-modal-form";
import { UserObject } from "@/lib/supabase/user-session";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";

interface UserModalProps {
  user: UserObject;
}

export default function UserModal({ user }: UserModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    flushSync(() => setModalOpen(false));
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg">User settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30rem] p-8">
        <DialogHeader>
          <DialogTitle>User settings</DialogTitle>
        </DialogHeader>
        <UserModalForm user={user} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}

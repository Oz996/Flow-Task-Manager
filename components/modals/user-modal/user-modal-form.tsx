import { useState } from "react";
import UserNamesForm from "./user-names-form";
import { Button } from "@/components/ui/button";
import UserPasswordForm from "./user-password-form";
import { UserObject } from "@/lib/supabase/user-session";
import DeleteModal from "../delete-modal/delete-modal";

interface UserModalFormProps {
  user: UserObject;
  closeModal: () => void;
}

type EditingType = "names" | "password" | null;

export default function UserModalForm({
  user,
  closeModal,
}: UserModalFormProps) {
  const [editing, setEditing] = useState<EditingType>(null);

  function exitEditing() {
    setEditing(null);
  }

  if (!editing)
    return (
      <div className="flex flex-col gap-3">
        <Button onClick={() => setEditing("names")}>Edit username/email</Button>
        <Button onClick={() => setEditing("password")}>Change password</Button>
        <DeleteModal id={user.id} type="User" />
      </div>
    );

  if (editing === "names") {
    return (
      <UserNamesForm
        user={user}
        closeModal={closeModal}
        exitEditing={exitEditing}
      />
    );
  }

  if (editing === "password") {
    return (
      <UserPasswordForm exitEditing={exitEditing} closeModal={closeModal} />
    );
  }
}

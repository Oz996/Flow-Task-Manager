import { UserObject } from "@/lib/types";
import { useState } from "react";
import UserNamesForm from "./user-names-form";
import { Button } from "@/components/ui/button";
import UserPasswordForm from "./user-password-form";
import DeleteUserButton from "@/components/header/delete-user-button";

interface UserModalFormProps {
  user: UserObject;
}

type EditingType = "names" | "password" | null;

export default function UserModalForm({ user }: UserModalFormProps) {
  const [editing, setEditing] = useState<EditingType>(null);

  function exitEditing() {
    setEditing(null);
  }

  if (!editing)
    return (
      <div className="flex flex-col gap-3">
        <Button onClick={() => setEditing("names")}>Edit username/email</Button>
        <Button onClick={() => setEditing("password")}>Change password</Button>
        <DeleteUserButton user={user} />
      </div>
    );

  if (editing === "names")
    return <UserNamesForm user={user} exitEditing={exitEditing} />;

  if (editing === "password") {
    return <UserPasswordForm exitEditing={exitEditing} />;
  }
}

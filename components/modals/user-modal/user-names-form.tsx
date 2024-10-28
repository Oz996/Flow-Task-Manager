import { updateNamesAction } from "@/app/(auth)/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserObject } from "@/lib/types";
import { ChangeEvent, useEffect, useState } from "react";

interface UserNamesFormProps {
  user: UserObject;
  exitEditing: () => void;
}

interface UserForm {
  username: string;
  email: string;
}

const initialState: UserForm = {
  username: "",
  email: "",
};

export default function UserNamesForm({
  user,
  exitEditing,
}: UserNamesFormProps) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData({
      username: user.user_metadata.username,
      email: user.user_metadata.email,
    });
  }, [user]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    return setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function formAction(formData: FormData) {
    await updateNamesAction(user.id, formData);
    exitEditing();
  }

  console.log("user", user);

  return (
    <form className="space-y-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-1">
        <Button
          type="button"
          variant="ghost"
          onClick={exitEditing}
          className="w-full rounded-full"
        >
          Back
        </Button>
        <SubmitButton formAction={formAction} className="w-full rounded-full">
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}

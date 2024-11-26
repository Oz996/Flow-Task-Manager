import { updateNamesAction } from "@/app/(auth)/actions";
import FormError from "@/app/(auth)/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsernameEmailSchema } from "@/lib/schemas";
import { UserObject } from "@/lib/supabase/user-session";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

interface UserNamesFormProps {
  user: UserObject;
  exitEditing: () => void;
  closeModal: () => void;
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
  closeModal,
}: UserNamesFormProps) {
  const [errors, setErrors] = useState<ZodError>();
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
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();

    if (
      email === user.user_metadata.email &&
      username === user.user_metadata.username
    ) {
      return exitEditing();
    }
    const result = UsernameEmailSchema.safeParse({ username, email });

    if (!result.success) {
      console.error(result.error.errors);
      setErrors(result.error);
    } else {
      closeModal();
      try {
        toast.promise(updateNamesAction(user.id, formData), {
          loading: "Loading...",
          success: "Credentials updated",
          error: "Failed to update user credentials, try again later",
        });
      } catch (error: any) {
        console.error(error.message);
      } finally {
      }
    }
  }

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

      {errors && (
        <div className="flex flex-col gap-1 mt-5">
          {errors.errors.map((error, index) => (
            <FormError error={error?.message} key={index} />
          ))}
        </div>
      )}

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

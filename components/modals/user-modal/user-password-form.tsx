import { updateNamesAction, updatePasswordAction } from "@/app/(auth)/actions";
import FormError from "@/app/(auth)/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordSchema } from "@/lib/schemas";
import { UserObject } from "@/lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";

interface UserNamesFormProps {
  exitEditing: () => void;
}

interface UserForm {
  password: string;
  confirm_password: string;
}

const initialState: UserForm = {
  password: "",
  confirm_password: "",
};

export default function UserPasswordForm({ exitEditing }: UserNamesFormProps) {
  const [errors, setErrors] = useState<ZodError>();
  const [formData, setFormData] = useState(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    return setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function formAction(formData: FormData) {
    const password = formData.get("password")?.toString();
    const confirm_password = formData.get("confirm_password")?.toString();

    const result = PasswordSchema.safeParse({ password, confirm_password });

    if (!result.success) {
      console.error(result.error.errors);
      setErrors(result.error);
    } else {
      await updatePasswordAction(formData);
      exitEditing();
    }
  }

  return (
    <form className="space-y-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm_password">Confirm password</Label>
        <Input
          id="confirm_password"
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
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

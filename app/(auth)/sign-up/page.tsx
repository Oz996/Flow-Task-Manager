import { signUpAction } from "@/app/(auth)/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import FormError from "../components/form-error";
import RequiredLabel from "@/components/required-label";

export default function Signup({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <>
      <form className="flex flex-col">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <RequiredLabel htmlFor="email">Email</RequiredLabel>
          <Input name="email" id="email" placeholder="you@example.com" />
          <RequiredLabel htmlFor="username">Username</RequiredLabel>
          <Input name="username" id="username" placeholder="Your username" />
          <Label htmlFor="picture">Profile Picture</Label>
          <Input name="picture" id="picture" type="file" accept="image/*" />
          <RequiredLabel htmlFor="password">Password</RequiredLabel>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
          />
          <RequiredLabel htmlFor="confirm-password">
            Confirm Password
          </RequiredLabel>
          <Input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
          />
          <FormError error={searchParams.error} />
          <SubmitButton loader formAction={signUpAction} className="mt-2">
            Sign up
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

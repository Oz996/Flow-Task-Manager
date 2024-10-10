import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import FormError from "../components/form-error";

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
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" />
          <Label htmlFor="username">Username</Label>
          <Input name="username" placeholder="Your username" />
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Your password" />
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
          />
          <FormError error={searchParams.error} />
          <SubmitButton formAction={signUpAction}>Sign up</SubmitButton>
        </div>
      </form>
    </>
  );
}

import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import FormError from "../components/form-error";

export default function Login({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <form className="flex flex-col">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input type="password" name="password" placeholder="Your password" />
        <FormError error={searchParams.error} />
        <SubmitButton formAction={signInAction}>Sign in</SubmitButton>
      </div>
    </form>
  );
}

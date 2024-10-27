"use client";
import { signOutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  async function signOut() {
    await signOutAction();
  }

  return (
    <Button className="rounded-lg" onClick={signOut}>
      Sign out
    </Button>
  );
}

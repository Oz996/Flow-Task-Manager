"use client";

import { Button } from "@/components/ui/button";
import { signInAsGuestAction } from "../actions";

export default function GuestButton() {
  async function handleGuestLogin() {
    await signInAsGuestAction();
  }
  return (
    <Button type="button" onClick={handleGuestLogin} className="mt-2">
      Enter as guest
    </Button>
  );
}

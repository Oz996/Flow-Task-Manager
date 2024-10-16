import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Section } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedNavigation(path: string, message: string) {
  return redirect(`/${path}?error=${encodeURIComponent(message)}`);
}

export function generateSection(): Section {
  return {
    id: crypto.randomUUID(),
    created_at: "",
    name: "",
  };
}

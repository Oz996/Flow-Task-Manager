import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedNavigation(path: string, message: string) {
  return redirect(`/${path}?error=${encodeURIComponent(message)}`);
}

import { clsx, type ClassValue } from "clsx";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redirectUser(sesseion: Session | null, redirectTo: string) {
  if (!sesseion) {
    redirect(redirectTo);
  }
}

export function redirectUserIfAuthenticated(
  sesseion: Session | null,
  redirectTo: string
) {
  if (sesseion) {
    redirect(redirectTo);
  }
}

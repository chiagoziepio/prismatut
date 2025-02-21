import { clsx, type ClassValue } from "clsx";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { db } from "./db/db";

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

export const getAccountByUserId = async (userId: string) => {
  try {
    const user = await db.account.findFirst({
      where: {
        userId,
      },
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVerfictionTokenByToken = async (token: string) => {
  try {
    const theToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return theToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

"use server";

import { schema } from "@/lib/db/schema";
import { signIn, signOut } from "../../auth";
import { db } from "@/lib/db/db";

//import { signIn } from "next-auth/react";

export const signUpWithGithub = async () => {
  await signIn("github");
  //console.log(signIn);
};

export const signInWithEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const res = await signIn("credentials", { email, password });
  console.log("res", res);
};
export const signUpWithEmail = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate data
    const validateData = schema.parse({ email, password });

    // Save to database
    await db.user.create({
      data: {
        email: validateData.email,
        password: validateData.password,
      },
    });

    return { success: true }; // ✅ Indicate success
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Signup failed" }; // ❌ Return error
  }
};

export const SignOutt = async () => {
  await signOut();
};

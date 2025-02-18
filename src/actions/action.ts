"use server";

import { schema } from "@/lib/db/schema";
import { signIn, signOut } from "../../auth";
import { db } from "@/lib/db/db";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export const signUpWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
  //console.log(signIn);
};

export const signInWithEmail = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }
    console.log(formData);

    const checkUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!checkUser || !checkUser.password) {
      return { error: "User not found" };
    }
    await signIn("credentials", {
      email: checkUser.email,
      password,
      redirect: false,
    });
    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "please check your email or password" };
      }
    }
  }
};
export const signUpWithEmail = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate data
    const validateData = schema.parse({ email, password });
    const isEmailExisting = await db.user.findFirst({
      where: {
        email: {
          equals: validateData.email,
          mode: "insensitive",
        },
      },
    });
    if (isEmailExisting) {
      return { success: false, error: "Email already exists" }; // ❌ Return error
    }
    const hasbhPwd = await bcrypt.hash(validateData.password, 10);
    const lowerCaseEmail = validateData.email.toLowerCase();
    // Save to database
    await db.user.create({
      data: {
        email: lowerCaseEmail,
        password: hasbhPwd,
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

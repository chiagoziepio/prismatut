"use server";

import { db } from "@/lib/db/db";
import { schema } from "@/lib/db/schema";
import { sendMail } from "@/lib/sendMail";
import { generateVerificationToken } from "@/lib/tokens";
import { getVerfictionTokenByToken } from "@/lib/utils";
import bcrypt from "bcrypt-edge";
import { error } from "console";
import { AuthError } from "next-auth";
import { signIn, signOut } from "../../auth";

export const signUpWithGithub = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const signInWithEmail = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }
    // console.log(formData);

    const checkUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!checkUser || !checkUser.password) {
      return { error: "User not found" };
    }
    if (!checkUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      if (!verificationToken) {
        return { error: "Something went wrong" };
      }
      await sendMail(email, verificationToken.token);
      return { error: "Please verify your email. Email sent" };
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
  throw error;
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
      return { success: false, message: "Email already exists" }; // ❌ Return error
    }
    const hasbhPwd = bcrypt.hashSync(validateData.password, 8);
    const lowerCaseEmail = validateData.email.toLowerCase();
    // Save to database
    await db.user.create({
      data: {
        email: lowerCaseEmail,
        password: hasbhPwd,
      },
    });

    const verificationToken = await generateVerificationToken(
      validateData.email
    );
    if (!verificationToken) {
      return { success: false, message: "Something went wrong" };
    }
    await sendMail(validateData.email, verificationToken.token);

    return { success: true, message: "confirmation mail sent" }; // ✅ Indicate success
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "Signup failed" }; // ❌ Return error
  }
};

export const SignOutt = async () => {
  await signOut();
};

export const verifyToken = async (token: string) => {
  try {
    const verificationToken = await getVerfictionTokenByToken(token);

    if (!verificationToken) {
      return { success: false, message: "Invalid token" };
    }
    console.log({ verificationToken });
    if (verificationToken.expires < new Date()) {
      return { success: false, message: "Token expired" };
    }
    await db.user.update({
      where: {
        email: verificationToken.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await db.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });
    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Unable to verify email" };
  }
};

"use server";

import { signIn } from "../../auth";

//import { signIn } from "next-auth/react";

export const signUpWithGithub = async () => {
  await signIn("github");
  //console.log(signIn);
};

export const signUpWithEmail = async (formData: FormData) => {
  console.log(formData);
};

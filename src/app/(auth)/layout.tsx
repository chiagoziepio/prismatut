import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return <main>{children}</main>;
};

export default AuthLayout;

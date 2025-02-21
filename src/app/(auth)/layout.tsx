import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default AuthLayout;

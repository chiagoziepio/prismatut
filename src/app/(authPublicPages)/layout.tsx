import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <main>{children}</main>;
};

export default layout;

import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <main>{children}</main>;
};

export default layout;

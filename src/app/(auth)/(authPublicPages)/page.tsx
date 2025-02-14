import React from "react";
import { auth } from "../../../../auth";
import { redirectUser } from "@/lib/utils";

const Page = async () => {
  const session = await auth();
  redirectUser(session, "/login");
  return <div>page</div>;
};

export default Page;

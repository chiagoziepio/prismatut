import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default AuthLayout;

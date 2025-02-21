"use client";

import TokenVerification from "@/components/Auth/TokenVerification";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TokenVerification />
      </Suspense>
    </div>
  );
};

export default Page;

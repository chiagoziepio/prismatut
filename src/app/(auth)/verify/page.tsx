import { Suspense } from "react";
import TokenVerification from "@/components/Auth/TokenVerification";

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

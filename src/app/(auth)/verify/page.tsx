import TokenVerification from "@/components/Auth/TokenVerification";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TokenVerification token={token || ""} />
      </Suspense>
    </div>
  );
};

export default Page;

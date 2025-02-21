"use client";

import { verifyToken } from "@/actions/action";
import ErrorBox from "@/components/ErrorBox";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessBox from "../SuccesBox";

function TokenVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setIsVerifying(true);
        const res = await verifyToken(token);
        if (res.success) {
          setSuccess(res.message);
        } else {
          setError(res.message);
        }
        setIsVerifying(false);
      }
    };
    checkToken();
  }, [token]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isVerifying && (
        <Image src="/loader.gif" height={150} width={150} alt="loader" />
      )}
      <div>
        {error && <ErrorBox text={error} />}
        {success && (
          <>
            <SuccessBox text={success} />
            <Link
              href="/login"
              className={buttonVariants({
                variant: "default",
                className: "w-[120px] h-[45px] my-2",
              })}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default TokenVerification;

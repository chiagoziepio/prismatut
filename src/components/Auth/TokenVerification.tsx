"use client";

import { verifyToken } from "@/actions/action";
import ErrorBox from "@/components/ErrorBox";
import SuccesBox from "@/components/SuccesBox";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { useEffect } from "react";

const TokenVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (token)
        await verifyToken(token).then((res) => {
          if (!res.success) {
            setError(res.message);
            setIsVerifying(false);
          }
          if (res.success) {
            setSuccess(res.message);
            setIsVerifying(false);
          }
        });
    };
    if (token) {
      setIsVerifying(true);
      checkToken();
    }
  }, [token]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isVerifying && (
        <Image src={"/loader.gif"} height={150} width={150} alt="loader" />
      )}
      <div className="">
        {error && <ErrorBox text={error} />}
        {success && (
          <>
            <SuccesBox text={success} />
            <Link
              href={"/login"}
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
};

export default TokenVerification;

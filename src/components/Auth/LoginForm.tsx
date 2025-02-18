"use client";

import { signInWithEmail } from "@/actions/action";
import GithubSignBtn from "@/components/GithubSignBtn";
import Link from "next/link";
import FormFields from "@/components/FormBtn";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");

  return (
    <div className="w-[450px] mx-auto mt-20 bg-white rounded-[8px] p-7 h-fit border border-gray-200 shadow-md">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-center">
          Sign in to your account
        </h2>
      </div>
      <GithubSignBtn />
      <div className="my-5">
        <div className="flex items-center ">
          <span className="w-[25%] border-t border-gray-300" />
          <span className="flex-grow text-xl font-normal text-muted-foreground">
            or contiune with email
          </span>
          <span className="w-[25%] border-t border-gray-300" />
        </div>
        <form
          action={async (formData: FormData) => {
            signInWithEmail(formData).then((res) => {
              if (res?.error) {
                setError(res.error);
              }
              if (res?.success) {
                redirect("/dashboard");
              }
            });
          }}
          className="mt-5 flex flex-col gap-2"
        >
          <FormFields />
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <p>
          Dont have an account? <Link href={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useFormStatus } from "react-dom";
import { RiLoader5Fill } from "react-icons/ri";
import { Button } from "./ui/button";

export default function FormFields() {
  const { pending } = useFormStatus();

  return (
    <>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={pending}
          className="w-full p-2 border border-gray-300 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-400 rounded-md outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={pending}
          className="w-full p-2 disabled:cursor-not-allowed disabled:bg-gray-400 border  disabled:text-white border-gray-300 rounded-md outline-none focus:border-blue-500 mt-2"
        />
      </div>

      <Button
        variant={"outline"}
        disabled={pending}
        className="bg-blue-500 w-full text-white font-serif"
      >
        {" "}
        sign in {pending && <RiLoader5Fill className="animate-spin" />}
      </Button>
    </>
  );
}

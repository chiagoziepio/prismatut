"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

import { useFormStatus } from "react-dom";
import { RiLoader5Fill } from "react-icons/ri";

const BtnGithub = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={"outline"} className="w-full p-1">
      <FaGithub size={20} />{" "}
      {pending ? (
        <RiLoader5Fill size={20} className="animate-spin" />
      ) : (
        "Sign in with Github"
      )}
    </Button>
  );
};

export default BtnGithub;

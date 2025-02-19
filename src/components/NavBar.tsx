import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { auth } from "../../auth";
import Logout from "./Logout";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href={"/"}>
        <div className="w-fit h-fit">
          <h1 className="text-3xl font-semibold font-serif">Logo</h1>
        </div>
      </Link>

      <nav className="flex items-center gap-4">
        <ul className="list-none flex items-center gap-4 ">
          {session && (
            <Avatar className="bg-black flex items-center justify-center">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback className="text-white">
                {session?.user?.email?.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          {!session && (
            <li>
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            </li>
          )}
          {session && <Logout />}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { auth } from "../../auth";
import Logout from "./Logout";
import { Avatar, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";

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
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} />
              ) : (
                <AvatarFallback className="text-white">
                  {session?.user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
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

import { signUpWithEmail } from "@/actions/action";
import GithubSignBtn from "@/components/GithubSignBtn";
import { Button } from "@/components/ui/button";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
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
        <form action={signUpWithEmail} className="mt-5 flex flex-col gap-2">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 mt-2"
            />
          </div>
          <Button
            variant={"outline"}
            className="bg-blue-500 w-full text-white font-serif"
          >
            {" "}
            sign in{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}

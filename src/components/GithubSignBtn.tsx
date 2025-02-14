import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { signUpWithGithub } from "@/actions/action";

const GithubSignBtn = () => {
  return (
    <form action={signUpWithGithub}>
      <Button variant={"outline"} className="w-full p-1">
        <FaGithub size={20} /> Sign in with Github
      </Button>
    </form>
  );
};

export default GithubSignBtn;

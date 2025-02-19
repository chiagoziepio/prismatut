import { signUpWithGithub } from "@/actions/action";
import BtnGithub from "./Auth/BtnGithub";

const GithubSignBtn = () => {
  return (
    <form action={signUpWithGithub}>
      <BtnGithub />
    </form>
  );
};

export default GithubSignBtn;

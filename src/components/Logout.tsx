import { SignOutt } from "@/actions/action";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <form action={SignOutt}>
      <Button variant={"destructive"}>Logout</Button>
    </form>
  );
};

export default Logout;

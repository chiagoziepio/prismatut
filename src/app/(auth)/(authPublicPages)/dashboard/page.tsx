import { redirectUser } from "@/lib/utils";
import { auth } from "../../../../../auth";

const Page = async () => {
  const session = await auth();
  redirectUser(session, "/login");

  return <div>page</div>;
};

export default Page;

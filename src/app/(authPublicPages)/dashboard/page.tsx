import { redirectUser } from "@/lib/utils";
import { auth } from "../../../../auth";
import Logout from "@/components/Logout";

const Page = async () => {
  const session = await auth();
  //redirectUser(session, "/login");
  console.log(session);

  return (
    <div>
      page
      <Logout />
      <div>{session?.user?.email}</div>
    </div>
  );
};

export default Page;

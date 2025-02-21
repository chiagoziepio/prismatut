import { auth } from "../../../../auth";
import axios from "axios";

const fetchUser = async (id: string | undefined) => {
  try {
    const res = await axios.get("http://localhost:3000/api/user", {
      headers: {
        "x-user-id": id,
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Page = async () => {
  const session = await auth();
  let user;
  if (session) {
    user = await fetchUser(session?.user?.id);
  }
  //console.log(user);
  console.log(session?.user?.isOauth);

  return (
    <div>
      <div>{session?.user?.email}</div>
    </div>
  );
};

export default Page;

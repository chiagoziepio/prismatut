import { auth } from "../../../../auth";

const Page = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div>
      <div>{session?.user?.email}</div>
    </div>
  );
};

export default Page;

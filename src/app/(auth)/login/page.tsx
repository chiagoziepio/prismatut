import Login from "@/components/Auth/LoginForm";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="w-[450px] mx-auto mt-20 bg-white rounded-[8px] p-7 h-fit border border-gray-200 shadow-md">
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
};

export default page;

import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
const SuccesBox = ({ text }: { text: string }) => {
  return (
    <div className="bg-green-500 px-1 py-2 flex gap-2 rounded-lg w-full">
      <IoMdCheckmarkCircle className="text-white text-2xl" size={24} />
      <p className="text-white">{text}</p>
    </div>
  );
};

export default SuccesBox;

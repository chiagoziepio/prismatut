import { IoWarningOutline } from "react-icons/io5";

const ErrorBox = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-4 items-center bg-destructive p-4 rounded-md h-fit w-full px-1 py-2 my-2">
      <IoWarningOutline className="text-white text-2xl" size={24} />
      <p className="text-white">{text}</p>
    </div>
  );
};

export default ErrorBox;

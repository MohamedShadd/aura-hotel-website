import React from "react";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="min-[1px]:w-full min-[1150px]:w-auto bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded-md"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

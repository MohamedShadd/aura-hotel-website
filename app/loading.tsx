import React from "react";
import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}

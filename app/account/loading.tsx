import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="grid h-full w-full items-center justify-center">
      <div>
        <Spinner />
      </div>
    </div>
  );
}

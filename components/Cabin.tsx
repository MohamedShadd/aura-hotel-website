import TextExpander from "@/components/TextExpander";
import cabinInterface from "@/app/_lib/types/cabinInterface";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Cabin({ cabin }: { cabin: cabinInterface }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid min-[1150px]:grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="min-[1150px]:block hidden relative scale-[1.15] aspect-[0.8] -translate-x-3">
        <Image src={image} fill alt={`Cabin ${name}`} />
      </div>

      <div>
        <h3 className="mt-2 text-accent-100 font-black text-4xl min-[1150px]:text-7xl mb-5 min-[1150px]:translate-x-[-254px] bg-primary-950 min-[1150px]:p-6 pb-1 min-[1150px]:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-1150" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-1150" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-1150" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
      <div className="max-[1150px]:block hidden relative aspect-square ">
        <Image src={image} fill alt={`Cabin ${name}`} />
      </div>
    </div>
  );
}

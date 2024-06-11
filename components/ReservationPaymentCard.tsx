import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import bookingInterface from "@/app/_lib/types/bookingInterface";
import Image from "next/image";
import Link from "next/link";
import PayReservation from "./PayReservation";
import { getCabin } from "../app/_lib/api";
import cabinInterface from "../app/_lib/types/cabinInterface";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default async function ReservationPaymentCard({
  booking,
  cabin,
}: {
  booking: bookingInterface;
  cabin: cabinInterface;
}) {
  // const cabin = await getCabin(booking.cabinId as number);
  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={cabin.image as string}
          alt={`Cabin ${cabin.name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
        <p className="z-10 relative min-[650px]:hidden text-xl font-semibold text-accent-50 w-fit bg-primary-900/70 rounded-xl">
          ${booking.totalPrice}
        </p>
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <h3 className="text-xl font-semibold">
          {booking.numNights} nights in Cabin {cabin.name}
        </h3>
        <p className="text-lg text-primary-300">
          {format(new Date(booking.startDate!), "EEE, MMM dd yyyy")} (
          {isToday(new Date(booking.startDate!))
            ? "Today"
            : formatDistanceFromNow(booking.startDate!)}
          ) &mdash; {format(new Date(booking.endDate!), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="max-[650px]:hidden text-xl font-semibold text-accent-400">
            ${booking.totalPrice}
          </p>
          <p className="max-[650px]:hidden text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {booking.numGuests} guest{booking.numGuests! > 1 && "s"}
          </p>
          {booking.hasBreakfast && (
            <>
              <p className="max-[650px]:hidden text-primary-300">&bull;</p>
              <p className="text-lg text-primary-300">breakfast included</p>
            </>
          )}
          <p className="ml-auto text-sm text-primary-400">
            Booked{" "}
            {format(new Date(booking.created_at!), "EEE, MMM dd yyyy, p")}
          </p>
          {booking.paymentId && (
            <>
              <p className="max-[650px]:hidden text-primary-300">&bull;</p>
              <p className="text-sm text-primary-400">
                Transaction: {booking.paymentId}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

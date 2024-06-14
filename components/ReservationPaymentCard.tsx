"use client";
import bookingInterface from "@/types/bookingInterface";
import cabinInterface from "@/types/cabinInterface";
import { UsersIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function ReservationPaymentCard({
  booking,
  cabin,
}: {
  booking: bookingInterface;
  cabin: cabinInterface;
}) {
  const pathname = usePathname();

  return (
    <div className="flex border-primary-800 border">
      <div className="min-[1px]:hidden min-[1150px]:block flex-1 relative aspect-square h-auto">
        <Image
          fill
          src={cabin.image}
          alt={`Cabin ${cabin.name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow min-[1150px]:w-[70%]">
        <div className="aspect-square hidden max-[1150px]:block relative">
          <Image
            fill
            src={cabin.image}
            alt={`Cabin ${cabin.name}`}
            className="object-cover border-r border-primary-800"
          />
        </div>
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            {booking.numNights} nights in Cabin {cabin.name}
          </h3>
          <p className="text-lg text-primary-300">
            {format(new Date(booking.startDate!), "EEE, MMM dd yyyy")} (
            {isToday(new Date(booking.startDate!))
              ? "Today"
              : formatDistanceFromNow(booking.startDate!)}
            ) &mdash; {format(new Date(booking.endDate!), "EEE, MMM dd yyyy")}
          </p>

          <p className="flex gap-3 justify-end items-baseline">
            {cabin.discount! > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${booking.totalPrice}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  $
                  {Number(cabin.regularPrice * Number(booking.numNights)) +
                    Number(booking.extrasPrice)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${booking.totalPrice}</span>
            )}
            {booking.hasBreakfast && (
              <span className="text-primary-200">with breakfast</span>
            )}
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right flex max-[1150px]:flex-col justify-between pl-5">
          <div className="flex gap-3  max-[1150px]:items-start items-center max-[1150px]:flex-col">
            <p className="text-lg text-primary-200 flex gap-2  max-[1150px]:m-2">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              Reservation for{" "}
              <span className="font-bold">{booking.numGuests}</span> guest
              {booking.numGuests! > 1 && "s"}
            </p>
            <p className="text-sm text-primary-400">
              Booked{" "}
              {format(new Date(booking.created_at!), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
          {pathname.split("/").at(1) == "confirmation" && (
            <Link
              href={`/account`}
              className="min-[1px]:w-full min-[500px]:w-auto py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
            >
              Recent Transations &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

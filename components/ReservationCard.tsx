import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import bookingInterface from "@/app/_lib/types/bookingInterface";
import Image from "next/image";
import Link from "next/link";
import PayReservation from "./PayReservation";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({
  booking,
  onDelete,
}: {
  booking: bookingInterface;
  onDelete: Function;
}) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    isPaid,
    cabins: { name, image },
  }: any = booking;

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image as string}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
        <p className="z-10 relative min-[650px]:hidden text-xl font-semibold text-accent-50 w-fit bg-primary-900/70 rounded-xl">
          ${totalPrice}
        </p>
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="max-[650px]:hidden bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="max-[650px]:hidden bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="max-[650px]:hidden text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="max-[650px]:hidden text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          {isPaid ? (
            <>
              <p className="max-[650px]:hidden text-primary-300">&bull;</p>
              <p className="text-lg text-green-300">Paid</p>
            </>
          ) : (
            <>
              <p className="max-[650px]:hidden text-primary-300">&bull;</p>
              <p className="text-lg text-red-300">Unpaid</p>
            </>
          )}
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800">
        {!isPast(startDate) && (
          <>
            {!isPaid && <PayReservation booking={booking} bookingId={id} />}
            <Link
              href={`/account/reservations/${id}/edit`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            {!isPaid && (
              <DeleteReservation onDelete={onDelete} bookingId={id} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;

import UpdateBookingForm from "@/components/UpdateBookingForm";
import { getBooking, getCabin } from "@/lib/api";
import bookingInterface from "@/types/bookingInterface";
import cabinInterface from "@/types/cabinInterface";

export default async function Page({
  params,
}: {
  params: { bookingId: number };
}) {
  const { bookingId } = params;
  const booking: bookingInterface = await getBooking(bookingId);
  const { cabinId } = booking;
  const cabin: cabinInterface = await getCabin(cabinId as number);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <UpdateBookingForm booking={booking} cabin={cabin} />
    </div>
  );
}

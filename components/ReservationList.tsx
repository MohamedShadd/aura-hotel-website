"use client";

import { deleteBooking } from "@/lib/actions";
import bookingInterface from "@/types/bookingInterface";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

export default function ReservationList({
  bookings,
}: {
  bookings: bookingInterface[];
}) {
  const [optimisticBookings, optimisticDelete]: [
    optimisticBookings: bookingInterface[],
    optimisticDelete: any
  ] = useOptimistic(bookings, (cur, bookingId) => {
    return cur.filter((booking) => booking.id !== bookingId);
  });

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    return await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

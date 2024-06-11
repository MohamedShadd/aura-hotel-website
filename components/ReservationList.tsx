"use client";

import React, { useOptimistic } from "react";
import bookingInterface from "@/app/_lib/types/bookingInterface";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";

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

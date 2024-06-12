"use client";
import { dateRange } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext<any>({});
const initialState = { from: undefined, to: undefined };
export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<dateRange>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error(
      "Reservation Context was used outside Reservation Provider"
    );
  return context;
}

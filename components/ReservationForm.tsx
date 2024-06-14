"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useReservation } from "@/context/ReservationContext";
import { createBooking } from "@/lib/actions";
import cabinInterface from "@/types/cabinInterface";
import { differenceInDays } from "date-fns";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import bookingInterface from "@/types/bookingInterface";
import settingsInterface from "@/types/settingsInterface";
import SubmitButton from "./SubmitButton";

export default function ReservationForm({
  cabin,
  user,
  settings,
}: {
  cabin: cabinInterface;
  user: User;
  settings: settingsInterface;
}) {
  // CHANGE
  const [payNow, setPayNow] = useState<boolean>(true);
  const [hasBreakfast, setHasBreakfast] = useState<boolean>(false);
  const { toast } = useToast();
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;
  const breakfastPrice = settings.breakfastPrice;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData: bookingInterface = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 max-[1150px]:px-4 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width={32}
            height={32}
            src={user.image as string}
            alt={user.name as string}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={(data) =>
          createBookingWithData(data).then((res) => {
            toast({
              description: "Successfully created Reservation",
            });
            resetRange();
          })
        }
        className="bg-primary-900 max-[1150px]:px-4 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="space-y-2 items-top flex space-x-2">
          <Checkbox
            id="hasBreakfast"
            name="hasBreakfast"
            onClick={() => setHasBreakfast((e: boolean) => !e)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="hasBreakfast"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Daily Breakfast
            </label>
            <p className="text-sm text-muted-foreground">
              You will pay an additional daily fee of ${breakfastPrice}
              {!!cabinPrice &&
                `, total amount
              of $${Number(cabinPrice + Number(breakfastPrice * numNights))}`}
            </p>
          </div>
        </div>
        <div className="space-y-2 items-top flex space-x-2">
          <Checkbox
            id="payNow"
            name="payNow"
            checked={payNow}
            onClick={() => setPayNow((pay) => !pay)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="hasBreakfast"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pay now
            </label>
            <p className="text-sm text-muted-foreground">
              Do you wish to pay the
              {!!cabinPrice &&
                ` total amount
              of $${Number(
                cabinPrice +
                  Number(hasBreakfast ? breakfastPrice * numNights : 0)
              )}`}{" "}
              now?
            </p>
          </div>
        </div>

        <div className="flex max-[1150px]:flex-col justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <>
              <SubmitButton>
                {payNow ? "Reserve and Pay" : "Reserve"}
              </SubmitButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

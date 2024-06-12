"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTransition } from "react";
import bookingInterface from "../types/bookingInterface";
import SpinnerMini from "./SpinnerMini";

function PayReservation({
  bookingId,
  booking,
}: {
  bookingId: number;
  booking: bookingInterface;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
        {isPending ? (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        ) : (
          <>
            <BanknotesIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Pay</span>
          </>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to pay a total price of ${booking.totalPrice}{" "}
            {booking.hasBreakfast && `(breakfast included)`} for{" "}
            {booking.numNights} night{booking.numNights! > 1 && "s"} at cabin{" "}
            {booking.cabins!.name}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Link href={`/account/reservations/${bookingId}/pay`}>Pay Now</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PayReservation;

import ReservationPaymentCard from "@/components/ReservationPaymentCard";
import { Button } from "@/components/ui/button";
import { getBooking, getCabin } from "@/lib/api";
import bookingInterface from "@/types/bookingInterface";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function Page({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.bookingId == null) return notFound();
  const booking: bookingInterface = await getBooking(
    paymentIntent.metadata.bookingId as any
  );
  if (booking == null) return notFound();
  const cabin = await getCabin(booking.cabinId!);
  if (booking == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        {isSuccess ? "Payment Successfull" : "Payment Error"}
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
      <div className="text-start">
        <ReservationPaymentCard booking={booking} cabin={cabin} />
      </div>
      {!isSuccess && (
        <Button>
          <Link href={`/account/reservations/${booking.id}/pay`}>
            Try Again
          </Link>
        </Button>
      )}
    </div>
  );
}

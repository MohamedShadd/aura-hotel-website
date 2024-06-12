import CheckoutForm from "@/components/CheckoutForm";
import { getBooking, getCabin } from "@/lib/api";
import { auth } from "@/lib/auth";
import bookingInterface from "@/types/bookingInterface";
import cabinInterface from "@/types/cabinInterface";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  params,
}: {
  params: { bookingId: number };
}) {
  const booking: bookingInterface = await getBooking(params.bookingId);
  const session = await auth();
  if (!(booking && session)) return redirect("/cabins");
  const cabin: cabinInterface = await getCabin(booking.cabinId!);
  if (!booking) return redirect("/account/reservations");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(booking.totalPrice! * 100),
    currency: "USD",
    metadata: { bookingId: booking.id as number },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Payment Intent creation failed");
  }

  return (
    <CheckoutForm
      booking={booking}
      cabin={cabin}
      email={session.user.email}
      clientSecret={paymentIntent.client_secret}
    />
  );
}

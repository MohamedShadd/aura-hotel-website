"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import bookingInterface from "../types/bookingInterface";
import cabinInterface from "../types/cabinInterface";
import ReservationPaymentCard from "./ReservationPaymentCard";
import SpinnerMini from "./SpinnerMini";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutForm({
  booking,
  cabin,
  email,
  clientSecret,
}: {
  booking: bookingInterface;
  cabin: cabinInterface;
  email: string;
  clientSecret: string;
}) {
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#38393c",
      colorBackground: "#141c24",
      colorText: "#b7c7d7",
    },
  };
  return (
    <>
      <div className="flex flex-col gap-10">
        <ReservationPaymentCard booking={booking} cabin={cabin} />
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <Form booking={booking} email={email} />
        </Elements>
      </div>
    </>
  );
}

function Form({
  booking,
  email,
}: {
  booking: bookingInterface;
  email: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (stripe == null || elements == null) return;
    if (booking.isPaid) return;
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/confirmation/payment`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          toast({
            description: error.message,
          });
        } else {
          toast({
            description: "An unknown error has occured",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <PaymentElement options={paymentElementOptions} />
      <div className="mt-5">
        <LinkAuthenticationElement
          className="hidden"
          options={{ defaultValues: { email } }}
        />
      </div>
      <Button
        className="mt-4 min-w-10 w-full"
        disabled={stripe == null || elements == null || isLoading}
      >
        {isLoading ? <SpinnerMini /> : ` Purchase for $${booking.totalPrice}`}
      </Button>
    </form>
  );
}


import { getBooking } from "@/lib/api"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest, res: NextResponse) {
    const event = stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const bookingId = charge.metadata.bookingId
        const email = charge.billing_details.email
        const PriceInCents = charge.amount


        const booking = await getBooking(Number(bookingId))
        if (booking == null || email == null) {
            return new NextResponse("Bad Request", { status: 400 })
        }


        const updateData = {
            isPaid: true,
            paymentId: charge.payment_intent

        }

        const { error } = await supabase
            .from("bookings")
            .update(updateData)
            .eq("id", bookingId)
            .select()
            .single();

        if (error)
            return new NextResponse("Bad Request", { status: 400 })

        revalidatePath("/account/reservations")
        return new NextResponse()
    }
    return new NextResponse()
}
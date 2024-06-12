"use server"

import bookingInterface from "@/types/bookingInterface"
import settingsInterface from "@/types/settingsInterface"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getBooking, getSettings } from "./api"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"

export async function updateGuest(formData: FormData | any) {
    const session: any = await auth()
    if (!session) throw new Error("You must be logged in")
    const nationalID = formData.get("nationalID")
    const [nationality, countryFlag] = formData.get("nationality").split("$")


    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID")

    const updateData = { nationality, countryFlag, nationalID }

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session?.user?.guestId)

    if (error) {
        console.error(error);
        throw new Error("Guest could not be updated");
    }


    revalidatePath("/account/profile")

    return "Successfully updated profile"
}

export async function createBooking(bookingData: bookingInterface, formData: FormData | any) {
    console.log(formData)
    const session: any = await auth()
    if (!session) throw new Error("You must be logged in")
    if (!Number(bookingData.cabinPrice)) throw new Error("Please select booking dates")
    if (!Number(formData.get('numGuests'))) throw new Error("Please choose number of guests")
    if (!Number(bookingData.cabinPrice)) throw new Error("Please select booking dates")
    const settings: settingsInterface = await getSettings()
    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: String(formData.get('observations').slice(0, 1000)),
        extrasPrice: Boolean(formData.get('hasBreakfast')) ? Number(settings.breakfastPrice * Number(bookingData.numNights)) : 0,
        totalPrice: Boolean(formData.get('hasBreakfast')) ? Number(bookingData.cabinPrice) + Number(settings.breakfastPrice * Number(bookingData.numNights)) : Number(bookingData.cabinPrice),
        isPaid: false,
        hasBreakfast: Boolean(formData.get('hasBreakfast')),
        status: "unconfirmed"
    }

    const { data, error } = await supabase
        .from("bookings")
        .insert([newBooking])
        .select()
        .single()

    if (error)
        throw new Error("Booking could not be created");
    revalidatePath(`/cabins/${bookingData.cabinId}`)

    console.log(Boolean(formData.get('payNow')))
    if (formData.get('payNow') == 'on') redirect(`/account/reservations/${data.id}/pay`)

    redirect("/confirmation")

}

export async function deleteBooking(bookingId: number) {
    const session: any = await auth()
    const booking = await getBooking(bookingId)
    if (!session) throw new Error("You must be logged in")
    if (session.user.guestId !== booking.guestId) throw new Error(`Bookng of id #${bookingId} doesn't belong to user of id #${session.user.guestId}`)
    const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

    if (error)
        throw new Error("Booking could not be deleted");

    revalidatePath("/account/reservations")

    return "Successfully deleted reservation"
}

export async function updateBooking(formData: FormData | any) {
    const session: any = await auth()
    const bookingId = formData.get('bookingId')
    const booking = await getBooking(bookingId)
    if (!session) throw new Error("You must be logged in")
    if (session.user.guestId !== booking.guestId) throw new Error(`Bookng of id #${bookingId} doesn't belong to user of id #${session.user.guestId}`)

    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000)
    }

    const { error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .select()
        .single();

    if (error)
        throw new Error("Booking could not be updated");
    revalidatePath('/account/reservations')
    revalidatePath(`/account/reservations/${bookingId}/edit/`)
    redirect('/account/reservations')
}



export async function signInAction() {
    await signIn('google', { redirectTo: "/account" })
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' })
}


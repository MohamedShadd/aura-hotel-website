import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { NextRequest } from "next/server"
import { createGuest, getGuest } from "./api"
import { redirect } from "next/navigation"
import userInterface from "@/app/_lib/types/userInterface"


const authConfig = {
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
    })],
    callbacks: {
        authorized({ auth, request }: { auth: any, request: NextRequest }) {
            return !!auth?.user
        },
        async signIn({ user, account, profile }: any) {
            try {
                const existingGuest = await getGuest(user.email)
                if (!existingGuest) await createGuest({
                    email: user.email,
                    fullName: user.name

                })
                return true
            } catch {
                return false
            }
        },
        async session({ session, user }: any) {
            const guest = await getGuest(session.user.email)
            session.user.guestId = guest.id
            return session as userInterface
        }
    },
    pages: {
        signIn: "/login"
    }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig as any)
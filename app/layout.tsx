import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { ReservationProvider } from "@/context/ReservationContext";
import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Aura Hotel",
    default: "Aura Hotel",
  },
  description: "Luxurious hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative `}
      >
        <Header />
        <div className="flex-1 min-[1px]:px-4 min-[1150px]:px-8 py-12 grid overflow-hidden">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

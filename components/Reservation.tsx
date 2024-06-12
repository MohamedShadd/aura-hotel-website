import { getBookedDatesByCabinId, getSettings } from "@/lib/api";
import { auth } from "@/lib/auth";
import cabinInterface from "@/types/cabinInterface";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({
  cabin,
}: {
  cabin: cabinInterface;
}) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();
  return (
    <div className="grid min-[1150px]:grid-cols-2 border border-primary-800 min-[1150px]:min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user}
          settings={settings}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

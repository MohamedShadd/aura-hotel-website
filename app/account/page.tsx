import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookings } from "@/lib/api";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user.guestId!);
  const transactions = bookings.filter((booking) => booking.paymentId !== null);
  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {session?.user?.name}
      </h2>
      <h3>Recent Transactions</h3>
      <div className="max-[600px]:overflow-x-scroll">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Booking</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Breakfast</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">#{transaction.id}</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  {transaction.hasBreakfast ? "True" : "False"}
                </TableCell>
                <TableCell className="text-right">
                  ${transaction.totalPrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

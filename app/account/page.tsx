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
      <div className="overflow-x-scroll max-w-[88%]">
        <Table className="">
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Booking</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Breakfast</TableHead>
              <TableHead>Transaction</TableHead>
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
                <TableCell>{transaction.paymentId}</TableCell>
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

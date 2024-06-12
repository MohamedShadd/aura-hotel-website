
interface booking {
  id?: number;
  guestId?: number;
  startDate?: string;
  endDate: string;
  numNights?: number;
  totalPrice?: number;
  numGuests?: number;
  status?: string;
  isPaid?: boolean;
  hasBreakfast?: boolean;
  created_at?: string;
  cabinPrice?: number
  cabinId?: number
  extrasPrice?: number;
  observations?: string;
  cabins?: { name: string; image: string }
  paymentId?: string
}

export default interface bookingInterface extends booking { }


export default interface cabinInterface {
  id: number;
  name: string;
  description?: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

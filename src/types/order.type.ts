import { TProduct } from "./product.type";

export interface IOrderResponse {
  transaction: { id: string; transactionStatus: string };
  _id: string;
  user: { email: string };
  products: { quantity: number; product: TProduct }[];
  deliveryAddress?: {
    fullName: string;
    phone: string;
    address: string;
  };
  totalPrice: number;
  status: string;
  orderStatus: string;
  createdAt?: string;
}

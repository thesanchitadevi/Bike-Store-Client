export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};
export type TProductDetails = {
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: string;
  inStock: string;
  image: string;
  model: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

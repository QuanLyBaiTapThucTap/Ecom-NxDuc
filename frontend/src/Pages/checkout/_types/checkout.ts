export type PaymentMethod = "cod" | "banking" | "card";

export interface ShippingInformation {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  note: string;
}

export interface CheckoutFormData extends ShippingInformation {
  paymentMethod: PaymentMethod;
}

export interface CheckoutOrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CheckoutOrder {
  items: CheckoutOrderItem[];
  shipping: ShippingInformation;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
}

import { apiRequest } from "@/Services/api";
import type {
  CheckoutOrder,
  CheckoutOrderItem,
  ShippingInformation,
  PaymentMethod,
} from "../_types/checkout";

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid";

export interface SavedOrder {
  id: number;
  userId?: number;
  requestId?: string;
  items: CheckoutOrderItem[];
  shipping: ShippingInformation;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  voucher?: string | null;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}

export const checkoutService = {
  createOrder: (order: CheckoutOrder, requestId: string) =>
    apiRequest<SavedOrder>("/orders", {
      method: "POST",
      body: JSON.stringify({ ...order, requestId }),
    }),

  getOrders: () => apiRequest<SavedOrder[]>("/orders"),

  getAllOrdersAdmin: () => apiRequest<SavedOrder[]>("/orders?all=true"),

  getOrderById: (id: number | string) =>
    apiRequest<SavedOrder>(`/orders/${id}`),

  updateOrderStatus: (
    id: number | string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus,
  ) =>
    apiRequest<SavedOrder>(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, paymentStatus }),
    }),
};

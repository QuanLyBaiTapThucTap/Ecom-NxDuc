import { apiRequest } from "@/Services/api";
import type { CheckoutOrder } from "../_types/checkout";
export interface SavedOrder extends CheckoutOrder { id: number; createdAt: string; status: string; paymentStatus: string; }
export const checkoutService = {
 createOrder: (order: CheckoutOrder, requestId: string) => apiRequest<SavedOrder>("/orders", {method:"POST",body:JSON.stringify({...order,requestId})}),
 getOrders: () => apiRequest<SavedOrder[]>("/orders"),
};

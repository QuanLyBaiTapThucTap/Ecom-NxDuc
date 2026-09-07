import type { CheckoutOrder } from "../_types/checkout";

const createOrder = async (order: CheckoutOrder): Promise<CheckoutOrder> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });

  console.log("Order created:", order);

  return order;
};

export const checkoutService = {
  createOrder,
};

import type { Product } from "@/Pages/products/_types/product";

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  customerId?: number;
}

const STORAGE_KEY = "ecom-orders";

const getOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as Order[];
  } catch {
    return [];
  }
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

  window.dispatchEvent(new Event("orders-updated"));
};

const createOrder = ({
  products,
  discount = 0,
  shipping = 0,
  customerId,
}: {
  products: {
    product: Product;
    quantity: number;
  }[];
  discount?: number;
  shipping?: number;
  customerId?: number;
}): Order => {
  const items: OrderItem[] = products.map(({ product, quantity }) => ({
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    quantity,
    total: product.price * quantity,
  }));

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  const total = Math.max(0, subtotal - discount + shipping);

  const order: Order = {
    id: `ORD-${Date.now()}`,
    items,
    subtotal,
    discount,
    shipping,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    customerId,
  };

  const orders = getOrders();

  orders.push(order);

  saveOrders(orders);

  return order;
};

const getAllOrders = () => {
  return getOrders();
};

const getOrderById = (id: string) => {
  return getOrders().find((order) => order.id === id);
};

const updateOrderStatus = (id: string, status: Order["status"]) => {
  const orders = getOrders();

  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    return null;
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
  };

  saveOrders(orders);

  return orders[orderIndex];
};

const clearOrders = () => {
  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(new Event("orders-updated"));
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  clearOrders,
};

import { useCallback, useEffect, useMemo, useState } from "react";

import { checkoutService } from "@/Pages/checkout/_services/checkoutService";

export interface AdminOrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  total?: number;
}

export interface AdminOrder {
  id: string;
  userId?: number;
  requestId?: string;
  items: AdminOrderItem[];
  shipping: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    note?: string;
  };
  paymentMethod?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  customerId?: number;
}

const useAdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrder["status"] | "all">(
    "all",
  );

  const loadOrders = useCallback(async () => {
    try {
      const data = await checkoutService.getAllOrdersAdmin();
      const normalized: AdminOrder[] = [...data]
        .map((order) => ({
          ...order,
          id: String(order.id),
          customerId: order.userId,
          items: order.items.map((item) => ({
            ...item,
            total: item.price * item.quantity,
          })),
          shipping: {
            ...order.shipping,
            note: order.shipping?.note ?? "",
          },
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setOrders(normalized);
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    void loadOrders();

    const handleOrdersUpdated = () => {
      void loadOrders();
    };

    window.addEventListener("orders-updated", handleOrdersUpdated);

    return () => {
      window.removeEventListener("orders-updated", handleOrdersUpdated);
    };
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      if (!keyword) {
        return matchesStatus;
      }

      const matchesSearch =
        order.id.toLowerCase().includes(keyword) ||
        order.items.some((item) => item.title.toLowerCase().includes(keyword));

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const updateStatus = async (orderId: string, status: AdminOrder["status"]) => {
    try {
      const updated = await checkoutService.updateOrderStatus(orderId, status);
      if (!updated) return;

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? {
                ...order,
                ...updated,
                id: String(updated.id),
                customerId: updated.userId,
                items: updated.items.map((item) => ({
                  ...item,
                  total: item.price * item.quantity,
                })),
                shipping: {
                  ...updated.shipping,
                  note: updated.shipping?.note ?? "",
                },
              }
            : order,
        ),
      );
    } catch {
      // let caller surface UI feedback if needed
    }
  };

  const statistics = useMemo(() => {
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    const confirmedOrders = orders.filter(
      (order) => order.status === "confirmed",
    ).length;

    const completedOrders = orders.filter(
      (order) => order.status === "completed",
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled",
    ).length;

    const revenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((total, order) => total + order.total, 0);

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      completedOrders,
      cancelledOrders,
      revenue,
    };
  }, [orders]);

  return {
    orders,
    filteredOrders,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    updateStatus,

    statistics,

    reload: loadOrders,
  };
};

export default useAdminOrders;

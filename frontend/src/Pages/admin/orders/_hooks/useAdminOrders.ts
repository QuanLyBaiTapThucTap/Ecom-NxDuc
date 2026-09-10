import { useCallback, useEffect, useMemo, useState } from "react";

import {
  orderService,
  type Order,
} from "@/Pages/checkout/_services/orderService";

const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all",
  );

  const loadOrders = useCallback(() => {
    const data = orderService.getAllOrders();

    // Đơn mới nhất lên đầu
    setOrders(
      [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  }, []);

  useEffect(() => {
    loadOrders();

    const handleOrdersUpdated = () => {
      loadOrders();
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

  const updateStatus = (orderId: string, status: Order["status"]) => {
    orderService.updateOrderStatus(orderId, status);
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

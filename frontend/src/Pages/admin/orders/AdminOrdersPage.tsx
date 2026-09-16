import { useState } from "react";

import type { AdminOrder } from "./_hooks/useAdminOrders";

import OrderDetailModal from "./_components/OrderDetailModal";
import OrderTable from "./_components/OrderTable";

import useAdminOrders from "./_hooks/useAdminOrders";

const AdminOrdersPage = () => {
  const {
    filteredOrders,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    updateStatus,
    statistics,
  } = useAdminOrders();

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const formatPrice = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const handleStatusChange = (orderId: string, status: AdminOrder["status"]) => {
    updateStatus(orderId, status);

    // Nếu modal đang mở đúng đơn hàng vừa đổi status
    // thì cập nhật luôn modal.
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((current) =>
        current
          ? {
              ...current,
              status,
            }
          : null,
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400">
          Order management
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900">Orders</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer orders and track order status.
        </p>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Total Orders</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.totalOrders}
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Pending</p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {statistics.pendingOrders}
          </p>
        </div>

        {/* Confirmed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Confirmed</p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {statistics.confirmedOrders}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Completed</p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {statistics.completedOrders}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Revenue</p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(statistics.revenue)}
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            Excluding cancelled orders
          </p>
        </div>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order ID or product..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-xs outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as AdminOrder["status"] | "all")
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 outline-none transition focus:border-black"
          >
            <option value="all">All statuses</option>

            <option value="pending">Pending</option>

            <option value="confirmed">Confirmed</option>

            <option value="completed">Completed</option>

            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredOrders.length}
          </span>{" "}
          order
          {filteredOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* =====================================================
          ORDER TABLE
      ===================================================== */}

      <OrderTable
        orders={filteredOrders}
        onStatusChange={handleStatusChange}
        onViewDetail={setSelectedOrder}
      />

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default AdminOrdersPage;

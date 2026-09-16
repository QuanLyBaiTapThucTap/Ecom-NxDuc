import type { AdminOrder } from "@/Pages/admin/orders/_hooks/useAdminOrders";

import OrderStatusBadge from "./OrderStatusBadge";

interface OrderTableProps {
  orders: AdminOrder[];
  onStatusChange: (orderId: string, status: AdminOrder["status"]) => void;
  onViewDetail: (order: AdminOrder) => void;
}

const OrderTable = ({
  orders,
  onStatusChange,
  onViewDetail,
}: OrderTableProps) => {
  const formatPrice = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Order
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Products
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Total
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="text-3xl">📦</div>

                  <p className="mt-3 text-sm font-semibold text-gray-900">
                    No orders found
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Orders will appear here after customers complete checkout.
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  {/* Order ID */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-gray-900">
                      {order.id}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {order.items.length} product
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </td>

                  {/* Products */}
                  <td className="px-5 py-4">
                    <div className="max-w-[260px]">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {order.items[0]?.title || "No products"}
                      </p>

                      {order.items.length > 1 && (
                        <p className="mt-1 text-[11px] text-gray-400">
                          +{order.items.length - 1} more
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <p className="text-xs text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetail(order)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                      >
                        View
                      </button>

                      <select
                        value={order.status}
                        onChange={(event) =>
                          onStatusChange(
                            order.id,
                            event.target.value as AdminOrder["status"],
                          )
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none transition focus:border-black"
                      >
                        <option value="pending">Pending</option>

                        <option value="confirmed">Confirmed</option>

                        <option value="completed">Completed</option>

                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

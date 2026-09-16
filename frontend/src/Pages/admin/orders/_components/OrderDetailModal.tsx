import type { AdminOrder } from "@/Pages/admin/orders/_hooks/useAdminOrders";

import OrderStatusBadge from "./OrderStatusBadge";

interface OrderDetailModalProps {
  order: AdminOrder | null;
  onClose: () => void;
}

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  if (!order) {
    return null;
  }

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-[700px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Order details
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-900">{order.id}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-6">
          {/* Order info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-[11px] font-medium text-gray-400">Created</p>

              <p className="mt-1 text-xs font-semibold text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-[11px] font-medium text-gray-400">Status</p>

              <div className="mt-2">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-[11px] font-medium text-gray-400">
                Customer ID
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-900">
                {order.customerId ?? order.userId ?? "Guest"}
              </p>
            </div>
          </div>

          {typeof order.shipping === "object" && order.shipping !== null && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-bold text-gray-900">Shipping address</p>
              <p className="mt-2 text-xs text-gray-600">
                {order.shipping.fullName} • {order.shipping.phone}
              </p>
              <p className="text-xs text-gray-500">
                {order.shipping.address}, {order.shipping.district}, {order.shipping.city}
              </p>
              {order.shipping.email && (
                <p className="mt-1 text-[11px] text-gray-500">{order.shipping.email}</p>
              )}
            </div>
          )}

          {/* Products */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900">Products</h3>

            <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 p-4"
                >
                  {/* Image */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  {/* Total */}
                  <p className="shrink-0 text-sm font-bold text-gray-900">
                    {formatPrice(item.total ?? item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Subtotal</span>

              <span>{formatPrice(order.subtotal)}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Discount</span>

              <span className="text-green-600">
                -{formatPrice(order.discount)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Shipping</span>

              <span>{formatPrice(order.shippingFee ?? 0)}</span>
            </div>

            <div className="my-4 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">Total</span>

              <span className="text-lg font-bold text-black">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;

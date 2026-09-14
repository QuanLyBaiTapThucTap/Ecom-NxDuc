import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  checkoutService,
  type SavedOrder,
  type OrderStatus,
} from "@/Pages/checkout/_services/checkoutService";

const statusConfig: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: "Pending Processing",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  completed: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    let active = true;
    setLoading(true);
    checkoutService
      .getOrders()
      .then((data) => {
        if (active) {
          setOrders(data);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load orders.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <section className="space-y-6">
      {/* SECTION HEADER */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              My Orders
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Check the status of recent orders, manage returns, and view receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          </div>
        </div>

        {/* STATUS TABS */}
        <div className="mt-5 flex gap-2 overflow-x-auto border-t border-gray-100 pt-4">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((tab) => {
            const isActive = statusFilter === tab;
            const count =
              tab === "all"
                ? orders.length
                : orders.filter((o) => o.status === tab).length;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex justify-between border-b pb-4">
                <div className="h-4 w-36 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-200" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-16 w-full rounded bg-gray-100" />
                <div className="h-16 w-full rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR ALERT */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-xl">⚠️</p>
          <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredOrders.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="text-5xl">📦</div>
          <h2 className="mt-4 text-base font-bold text-gray-900">
            No orders found
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {statusFilter === "all"
              ? "You haven't placed any orders yet. Discover our tech catalog!"
              : `You don't have any ${statusFilter} orders.`}
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-6 text-xs font-semibold text-white transition hover:bg-black"
          >
            Explore Catalog
          </Link>
        </div>
      )}

      {/* ORDER LIST */}
      {!loading && !error && filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge =
              statusConfig[order.status] || statusConfig.pending;
            const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition hover:shadow-md"
              >
                {/* ORDER CARD HEADER */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/60 px-6 py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gray-900">
                      Order #{order.id}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{dateStr}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badge.bg} ${badge.text} ${badge.border}`}
                    >
                      {badge.label}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600 uppercase">
                      {order.paymentMethod.toUpperCase()} • {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* ITEMS LIST */}
                <div className="divide-y divide-gray-100 px-6">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 rounded-xl border border-gray-100 object-contain p-2 bg-gray-50 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/products/${item.productId}`}
                            className="line-clamp-1 text-xs font-bold text-gray-900 hover:underline"
                          >
                            {item.title}
                          </Link>
                          <p className="mt-1 text-[11px] text-gray-400">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-gray-900 shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ORDER FOOTER & SUMMARY */}
                <div className="flex flex-col justify-between gap-4 border-t border-gray-100 bg-gray-50/30 px-6 py-4 sm:flex-row sm:items-center">
                  <div className="text-xs text-gray-500">
                    <p className="font-semibold text-gray-700">
                      Shipping to: {order.shipping.fullName} ({order.shipping.phone})
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400 truncate max-w-md">
                      {order.shipping.address}, {order.shipping.district},{" "}
                      {order.shipping.city}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-3 text-right">
                    <div className="text-[11px] text-gray-400">
                      {order.discount > 0 && (
                        <span className="text-emerald-600 mr-2">
                          Discount: -${order.discount.toFixed(2)}
                        </span>
                      )}
                      <span>Shipping: ${order.shippingFee.toFixed(2)}</span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 mr-1.5">Total:</span>
                      <span className="text-base font-black text-gray-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

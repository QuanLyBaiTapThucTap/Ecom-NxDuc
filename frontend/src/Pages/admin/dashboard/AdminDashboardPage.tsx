import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, type ApiUser } from "@/Services/api";
import { checkoutService, type SavedOrder } from "@/Pages/checkout/_services/checkoutService";
import type { Product } from "@/Pages/products/_types/product";
import { analyticsService, type AnalyticsEvent } from "@/Services/analyticsService";

interface TopProductStat {
  id: number;
  title: string;
  image: string;
  soldQuantity: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState<7 | 30>(7);
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    revenue: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      apiRequest<Product[]>("/products").catch(() => []),
      checkoutService.getAllOrdersAdmin().catch(() => []),
      apiRequest<ApiUser[]>("/users").catch(() => []),
    ])
      .then(([prods, ords, usrs]) => {
        if (!active) return;
        setProducts(prods);
        setOrders(ords);
        setUsers(usrs);
        setEvents(analyticsService.getAll());
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // KPI Calculations
  const stats = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== "cancelled");
    const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = users.filter((u) => u.role !== "admin").length || users.length;
    const totalProducts = products.length;

    // Completed rate
    const completedOrders = orders.filter((o) => o.status === "completed").length;
    const completedRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      completedRate,
    };
  }, [orders, users, products]);

  // Order Status Breakdown
  const orderBreakdown = useMemo(() => {
    const total = orders.length || 1;
    const pending = orders.filter((o) => o.status === "pending").length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;

    return {
      pending: { count: pending, percent: Math.round((pending / total) * 100) },
      confirmed: { count: confirmed, percent: Math.round((confirmed / total) * 100) },
      completed: { count: completed, percent: Math.round((completed / total) * 100) },
      cancelled: { count: cancelled, percent: Math.round((cancelled / total) * 100) },
    };
  }, [orders]);

  // Revenue Chart Data (7 or 30 days)
  const chartData = useMemo(() => {
    const days = chartRange;
    const result: Array<{ label: string; fullDate: string; revenue: number }> = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Sum revenue for orders on this date (not cancelled)
      const dayRevenue = orders
        .filter(
          (o) =>
            o.status !== "cancelled" &&
            o.createdAt &&
            o.createdAt.slice(0, 10) === dateStr,
        )
        .reduce((sum, o) => sum + o.total, 0);

      result.push({
        label,
        fullDate: dateStr,
        revenue: Math.round(dayRevenue * 100) / 100,
      });
    }

    return result;
  }, [orders, chartRange]);

  // Top Selling Products calculated from orders
  const topProducts = useMemo(() => {
    const productStats: Record<number, TopProductStat> = {};

    for (const order of orders) {
      if (order.status === "cancelled") continue;
      for (const item of order.items) {
        if (!productStats[item.productId]) {
          productStats[item.productId] = {
            id: item.productId,
            title: item.title,
            image: item.image,
            soldQuantity: 0,
            totalRevenue: 0,
          };
        }
        productStats[item.productId].soldQuantity += item.quantity;
        productStats[item.productId].totalRevenue += item.price * item.quantity;
      }
    }

    // Sort by sold quantity descending
    const list = Object.values(productStats).sort(
      (a, b) => b.soldQuantity - a.soldQuantity,
    );

    // If fewer than 5 sold items exist, fill with catalog products
    if (list.length < 5) {
      for (const prod of products) {
        if (!productStats[prod.id]) {
          list.push({
            id: prod.id,
            title: prod.title,
            image: prod.image,
            soldQuantity: 0,
            totalRevenue: 0,
          });
          if (list.length >= 5) break;
        }
      }
    }

    return list.slice(0, 5);
  }, [orders, products]);

  // Recent 5 Orders
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [orders]);

  // SVG Chart Geometry
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 45;
  const paddingY = 30;

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 100);
  const chartPoints = useMemo(() => {
    const innerWidth = svgWidth - paddingX * 2;
    const innerHeight = svgHeight - paddingY * 2;

    return chartData.map((d, index) => {
      const x = paddingX + (index / (chartData.length - 1 || 1)) * innerWidth;
      const y = svgHeight - paddingY - (d.revenue / maxRevenue) * innerHeight;
      return { ...d, x, y };
    });
  }, [chartData, maxRevenue]);

  const linePath = useMemo(() => {
    if (!chartPoints.length) return "";
    return chartPoints.reduce(
      (acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
      "",
    );
  }, [chartPoints]);

  const areaPath = useMemo(() => {
    if (!chartPoints.length) return "";
    const first = chartPoints[0];
    const last = chartPoints[chartPoints.length - 1];
    const baseline = svgHeight - paddingY;
    return `${linePath} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
  }, [linePath, chartPoints]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gray-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-80 rounded-2xl bg-gray-200 lg:col-span-2" />
          <div className="h-80 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            Overview Dashboard
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Real-time analytics computed directly from store orders and catalog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-black"
          >
            <span>+ Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-800 transition hover:bg-gray-50"
          >
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Revenue
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
              💰
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-gray-900">
              ${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <span>↑ Live verified</span>
              <span className="text-gray-400 font-normal">from non-cancelled orders</span>
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Orders
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg">
              🛒
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-gray-900">
              {stats.totalOrders}
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
              <span>{stats.completedRate}%</span>
              <span className="text-gray-400 font-normal">fulfilled delivery rate</span>
            </p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Customers
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 text-lg">
              👥
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-gray-900">
              {stats.totalCustomers}
            </p>
            <p className="mt-1.5 text-[11px] text-gray-400">
              Registered registered accounts
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Active Catalog
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 text-lg">
              📦
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-gray-900">
              {stats.totalProducts}
            </p>
            <p className="mt-1.5 text-[11px] text-gray-400">
              Items available in JSON storage
            </p>
          </div>
        </div>
      </div>

      {/* ================= REVENUE CHART & ORDER BREAKDOWN ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* REVENUE CHART (SVG) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Revenue Trend
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Daily earnings based on confirmed client orders
              </p>
            </div>

            {/* RANGE TOGGLE */}
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => setChartRange(7)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  chartRange === 7
                    ? "bg-white text-black shadow-xs"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Last 7 Days
              </button>
              <button
                type="button"
                onClick={() => setChartRange(30)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  chartRange === 30
                    ? "bg-white text-black shadow-xs"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* SVG CHART CONTAINER */}
          <div className="relative mt-6 w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[500px]"
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const yVal = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
                const priceLabel = Math.round(maxRevenue * ratio);
                return (
                  <g key={ratio}>
                    <line
                      x1={paddingX}
                      y1={yVal}
                      x2={svgWidth - paddingX}
                      y2={yVal}
                      stroke="#f1f5f9"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={yVal + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#94a3b8"
                    >
                      ${priceLabel}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {areaPath && <path d={areaPath} fill="url(#revGrad)" />}

              {/* Line path */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data points */}
              {chartPoints.map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={chartRange === 7 ? 4.5 : 2.5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-transform hover:scale-150"
                    onMouseEnter={() =>
                      setHoveredPoint({
                        date: pt.label,
                        revenue: pt.revenue,
                        x: pt.x,
                        y: pt.y,
                      })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                  />

                  {/* X Axis Labels (sample if 30 days) */}
                  {(chartRange === 7 || i % 4 === 0 || i === chartPoints.length - 1) && (
                    <text
                      x={pt.x}
                      y={svgHeight - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748b"
                      fontWeight="500"
                    >
                      {pt.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* Interactive Tooltip */}
            {hoveredPoint && (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-12 rounded-xl bg-gray-900 px-3 py-1.5 text-center text-xs font-bold text-white shadow-xl"
                style={{
                  left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                  top: `${(hoveredPoint.y / svgHeight) * 100}%`,
                }}
              >
                <p className="text-[10px] text-gray-400">{hoveredPoint.date}</p>
                <p className="text-emerald-400">${hoveredPoint.revenue.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>

        {/* ORDER ANALYTICS STATUS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900">
            Order Status Breakdown
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">
            Distribution across order lifecycle
          </p>

          <div className="mt-6 space-y-4">
            {/* Pending */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-yellow-700">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Pending
                </span>
                <span className="text-gray-900">
                  {orderBreakdown.pending.count} ({orderBreakdown.pending.percent}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                  style={{ width: `${orderBreakdown.pending.percent}%` }}
                />
              </div>
            </div>

            {/* Confirmed */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Confirmed
                </span>
                <span className="text-gray-900">
                  {orderBreakdown.confirmed.count} ({orderBreakdown.confirmed.percent}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${orderBreakdown.confirmed.percent}%` }}
                />
              </div>
            </div>

            {/* Completed */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Completed
                </span>
                <span className="text-gray-900">
                  {orderBreakdown.completed.count} ({orderBreakdown.completed.percent}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${orderBreakdown.completed.percent}%` }}
                />
              </div>
            </div>

            {/* Cancelled */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-rose-700">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Cancelled
                </span>
                <span className="text-gray-900">
                  {orderBreakdown.cancelled.count} ({orderBreakdown.cancelled.percent}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${orderBreakdown.cancelled.percent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-gray-50 p-4 border border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Total volume processed: <span className="font-bold text-gray-900">{orders.length} orders</span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= TOP PRODUCTS & RECENT ORDERS ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* TOP PRODUCTS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Top Selling Products
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Calculated directly from customer purchase quantities
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              All Products →
            </Link>
          </div>

          <div className="mt-5 divide-y divide-gray-100">
            {topProducts.map((prod, idx) => (
              <div
                key={prod.id}
                className="flex items-center justify-between py-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      idx === 0
                        ? "bg-amber-100 text-amber-700"
                        : idx === 1
                        ? "bg-gray-200 text-gray-700"
                        : idx === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="h-10 w-10 shrink-0 rounded-lg border border-gray-100 object-contain p-1 bg-gray-50"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-gray-900">
                      {prod.title}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {prod.soldQuantity} units sold
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-gray-900">
                    ${prod.totalRevenue.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-gray-400">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Recent Orders
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Latest customer purchases in store
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View All Orders →
            </Link>
          </div>

          <div className="mt-5 divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <p className="py-8 text-center text-xs text-gray-400">
                No orders registered yet.
              </p>
            ) : (
              recentOrders.map((ord) => {
                const badgeColor =
                  ord.status === "completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : ord.status === "confirmed"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : ord.status === "cancelled"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-amber-50 text-amber-700 border-amber-200";

                return (
                  <div
                    key={ord.id}
                    className="flex items-center justify-between py-3.5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-900">
                          #{ord.id}
                        </span>
                        <span className="text-xs text-gray-600 truncate">
                          {ord.shipping?.fullName || "Customer"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {new Date(ord.createdAt).toLocaleDateString()} •{" "}
                        {ord.items?.length || 0} items
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${badgeColor}`}
                      >
                        {ord.status}
                      </span>
                      <span className="text-xs font-black text-gray-900">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Live Customer Activity
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Recent user interactions captured by client analytics
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600">
            {events.length} logged events
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(-8).reverse().map((ev) => (
            <div
              key={ev.id}
              className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs"
            >
              <span className="text-base">
                {ev.type === "ORDER_CREATED"
                  ? "📦"
                  : ev.type === "ADD_TO_CART"
                  ? "🛒"
                  : ev.type === "PRODUCT_VIEW"
                  ? "👀"
                  : "🌐"}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-gray-800 text-[11px]">
                  {ev.type.replace(/_/g, " ")}
                </p>
                <p className="truncate text-[10px] text-gray-400">
                  {new Date(ev.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

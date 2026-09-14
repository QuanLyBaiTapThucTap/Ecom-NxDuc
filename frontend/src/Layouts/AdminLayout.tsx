import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/Pages/auth/useAuth";

interface NavGroup {
  group: string;
  items: {
    label: string;
    path: string;
    icon: string;
  }[];
}

const menuGroups: NavGroup[] = [
  {
    group: "MAIN",
    items: [
      { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
      { label: "Products", path: "/admin/products", icon: "📦" },
      { label: "Orders", path: "/admin/orders", icon: "🛒" },
      { label: "Customers", path: "/admin/users", icon: "👥" },
    ],
  },
  {
    group: "ANALYTICS",
    items: [
      { label: "Overview", path: "/admin/dashboard", icon: "📈" },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { label: "Settings", path: "/account/security", icon: "⚙️" },
    ],
  },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Admin logged out successfully.");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const currentTitle = (() => {
    if (location.pathname.startsWith("/admin/products")) return "Products Management";
    if (location.pathname.startsWith("/admin/orders")) return "Orders Management";
    if (location.pathname.startsWith("/admin/users")) return "Customers Management";
    return "Dashboard & Store Analytics";
  })();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      {/* ================= SIDEBAR ================= */}
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          role="presentation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-gray-900">
                SWOO
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1 text-gray-400 hover:text-black lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* NAVIGATION GROUPS */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.group}>
              <p className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                {group.group}
              </p>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.path === "/admin/dashboard"
                      ? location.pathname === "/admin/dashboard"
                      : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.label + item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                        isActive
                          ? "bg-gray-900 text-white shadow-xs"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50">
          {/* Back to shop */}
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-white hover:text-black hover:shadow-xs"
          >
            <span className="text-base">🏪</span>
            <span>Back to Shop</span>
          </Link>

          {/* User profile & logout */}
          <div className="flex items-center justify-between border-t border-gray-200/60 pt-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                {user?.name?.firstname ? user.name.firstname[0].toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-gray-900">
                  {user?.name?.firstname
                    ? `${user.name.firstname} ${user.name.lastname}`
                    : "Administrator"}
                </p>
                <span className="inline-flex rounded-md bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700">
                  Admin
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-gray-400 hover:text-red-600 transition"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:pl-64 flex min-h-screen flex-col">
        {/* HEADER TOPBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-6 backdrop-blur-xs sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              ☰
            </button>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                Admin Console
              </p>
              <h2 className="text-lg font-bold text-gray-900">{currentTitle}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Store API Online
            </span>

            <Link
              to="/products"
              target="_blank"
              className="hidden rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:inline-flex"
            >
              Live Catalog ↗
            </Link>
          </div>
        </header>

        {/* OUTLET */}
        <main className="flex-1 p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

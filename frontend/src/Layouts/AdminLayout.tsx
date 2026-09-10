import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "📊",
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: "📦",
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: "🛒",
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: "👥",
  },
];
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* ================= SIDEBAR ================= */}
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-gray-200 px-6">
            <div>
              <h1 className="text-xl font-bold tracking-wide text-gray-900">
                SWOO
              </h1>

              <p className="text-xs text-gray-500">Administration</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black",
                  ].join(" ")
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Back to shop */}
          <div className="border-t border-gray-200 p-4">
            <NavLink
              to="/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>←</span>

              <span>Back to shop</span>
            </NavLink>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="ml-64 min-h-screen flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Admin Panel
              </p>

              <h2 className="text-lg font-semibold text-gray-900">
                TechStore Management
              </h2>
            </div>

            {/* Admin information */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                A
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Administrator
                </p>

                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

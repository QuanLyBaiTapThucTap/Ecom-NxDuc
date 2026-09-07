import { Link, useLocation } from "react-router-dom";

const AccountSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: "Profile",
      path: "/account",
      icon: "👤",
    },
    {
      label: "My Orders",
      path: "/account/orders",
      icon: "📦",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: "♡",
    },
    {
      label: "Security",
      path: "/account/security",
      icon: "🔒",
    },
  ];

  return (
    <aside className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* USER */}
      <div className="border-b border-gray-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
            ND
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-900">
              Nguyen Duc
            </p>

            <p className="mt-0.5 truncate text-[11px] text-gray-400">
              duc@example.com
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/account" && location.pathname === "/account/");

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mb-1 flex h-10 items-center gap-3 rounded-lg px-3 text-xs font-medium transition last:mb-0 ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="flex w-5 justify-center text-sm">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-gray-100 p-2">
        <button
          type="button"
          className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-xs font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <span className="flex w-5 justify-center text-sm">↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AccountSidebar;

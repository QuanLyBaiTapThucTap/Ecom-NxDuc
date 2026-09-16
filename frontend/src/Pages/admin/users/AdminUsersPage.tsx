import { useEffect, useMemo, useState } from "react";
import { apiRequest, type ApiUser } from "@/Services/api";
import {
  checkoutService,
  type SavedOrder,
} from "@/Pages/checkout/_services/checkoutService";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      apiRequest<ApiUser[]>("/users").catch(() => []),
      checkoutService.getAllOrdersAdmin().catch(() => []),
    ])
      .then(([loadedUsers, loadedOrders]) => {
        if (!active) return;
        setUsers(loadedUsers);
        setOrders(loadedOrders);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) => {
      const fullName = `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.trim();
      return (
        user.email.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        fullName.toLowerCase().includes(q)
      );
    });
  }, [search, users]);

  const stats = useMemo(() => {
    const customerUsers = users.filter((user) => user.role !== "admin");
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalCustomers: customerUsers.length,
      totalAdmins: users.filter((user) => user.role === "admin").length,
      totalOrders: orders.length,
      totalRevenue: totalSpent,
    };
  }, [orders, users]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Customer management</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-900">Customers</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-gray-400">Customers</p>
          <p className="mt-2 text-2xl font-black text-gray-900">{stats.totalCustomers}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-indigo-600">Admins</p>
          <p className="mt-2 text-2xl font-black text-indigo-700">{stats.totalAdmins}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-emerald-600">Orders</p>
          <p className="mt-2 text-2xl font-black text-emerald-700">{stats.totalOrders}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-amber-600">Revenue</p>
          <p className="mt-2 text-2xl font-black text-amber-700">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or username..."
          className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-500">Loading customers...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl">👥</p>
            <h3 className="mt-3 text-base font-bold text-gray-900">No customers found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Orders</th>
                  <th className="px-6 py-3.5">Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const fullName = `${user.name?.firstname ?? ""} ${user.name?.lastname ?? ""}`.trim() || user.username;
                  const userOrders = orders.filter((order) => order.userId === user.id);
                  const spent = userOrders.reduce((sum, order) => sum + order.total, 0);
                  const initials = fullName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/70">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-[11px] font-black text-white">
                            {initials || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{fullName}</p>
                            <p className="text-[11px] text-gray-400">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-700">{user.email}</p>
                        <p className="mt-1 text-[11px] text-gray-400">{user.phone || "No phone"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${
                            user.role === "admin"
                              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                              : "border-emerald-200 bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{userOrders.length}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">${spent.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

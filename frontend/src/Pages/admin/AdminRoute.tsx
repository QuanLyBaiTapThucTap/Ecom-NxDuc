import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/Pages/auth/useAuth";

const AdminRoute = () => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking administrator access...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8"
      >
        <p className="text-sm text-red-500">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  // Chưa đăng nhập
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname + location.search + location.hash,
        }}
      />
    );
  }

  // Đã đăng nhập nhưng không phải admin
  if (user.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  // Là admin → cho phép truy cập route admin
  return <Outlet />;
};

export default AdminRoute;

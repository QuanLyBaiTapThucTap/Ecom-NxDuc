import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
export default function ProtectedRoute() {
  const { user, loading, error } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-8">Loading account...</p>;
  if (error)
    return (
      <div role="alert" className="p-8">
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname + location.search }}
    />
  );
}

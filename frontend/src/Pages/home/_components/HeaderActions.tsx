import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/Pages/cart/_hooks/useCart";
import { useAuth } from "@/Pages/auth/useAuth";

const HeaderActions = () => {
  const { totalQuantity } = useCart();

  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-5">
      {/* WISHLIST */}
      <Link
        to="/wishlist"
        aria-label="Wishlist"
        className="text-xl transition-transform duration-200 hover:scale-110"
      >
        ♡
      </Link>

      {/* ACCOUNT */}
      <Link
        to={user ? "/account" : "/login"}
        aria-label="Account"
        className="text-xl transition-transform duration-200 hover:scale-110"
      >
        👤
      </Link>

      {/* CART */}
      <Link
        id="header-cart"
        to="/cart"
        aria-label={`Cart: ${totalQuantity} items`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-105"
      >
        <span className="text-xl">🛒</span>

        {/* CART BADGE */}
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {totalQuantity}
        </span>
      </Link>

      {/* ADMIN BUTTON (HIỂN THỊ TRỰC TIẾP KHI USER LÀ ADMIN) */}
      {user?.role === "admin" && (
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-black"
        >
          <span>⚡</span>
          <span>Admin</span>
        </Link>
      )}

      {/* LOGIN FOR GUEST */}
      {!user ? (
        <Link
          to="/login"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-black hover:text-black"
        >
          Login
        </Link>
      ) : (
        /* LOGOUT FOR LOGGED IN USERS */
        <button
          type="button"
          onClick={async () => {
            try {
              await logout();

              toast.success("Đăng xuất thành công!", {
                description: "Hẹn gặp lại bạn!",
              });
            } catch (error) {
              toast.error("Đăng xuất thất bại!", {
                description:
                  error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi. Vui lòng thử lại.",
              });
            }
          }}
          className="text-xs font-medium text-gray-600 transition hover:text-black"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default HeaderActions;

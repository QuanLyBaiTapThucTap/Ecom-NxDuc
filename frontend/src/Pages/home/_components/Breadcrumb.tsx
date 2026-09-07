import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  cart: "Cart",
  products: "Products",
  checkout: "Checkout",
  account: "Account",
  wishlist: "Wishlist",
  login: "Login",
  register: "Register",
  admin: "Admin",
};

const Breadcrumb = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center px-4">
        <div className="flex items-center gap-2 text-xs">
          {/* HOME */}
          <Link
            to="/"
            className="font-medium text-gray-500 transition hover:text-black"
          >
            Home
          </Link>

          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

            const isLast = index === pathSegments.length - 1;

            const label =
              routeLabels[segment] ??
              decodeURIComponent(segment)
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
              <div key={path} className="flex items-center gap-2">
                <span className="text-gray-300">/</span>

                {isLast ? (
                  <span className="font-medium capitalize text-gray-900">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="font-medium capitalize text-gray-500 transition hover:text-black"
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

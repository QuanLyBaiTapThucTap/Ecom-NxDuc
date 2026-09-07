import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
        🛒
      </div>

      <h2 className="mt-5 text-lg font-bold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mt-2 max-w-sm text-xs leading-5 text-gray-500">
        Looks like you haven't added anything to your cart yet. Start shopping
        and find something you love.
      </p>

      <Link
        to="/products"
        className="mt-5 flex h-10 items-center rounded-lg bg-black px-6 text-xs font-semibold text-white transition hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;

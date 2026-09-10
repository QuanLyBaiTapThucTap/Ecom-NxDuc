import { Link, useNavigate } from "react-router-dom";

import CartItem from "./_components/CartItem";
import CartSummary from "./_components/CartSummary";
import EmptyCart from "./_components/EmptyCart";
import { useCart } from "./_hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    selectedQuantity,
    subtotal,
    discount,
    shipping,
    total,
    allSelected,
    toggleItem: handleToggle,
    increaseQuantity: handleIncrease,
    decreaseQuantity: handleDecrease,
    removeItem: handleRemove,
    toggleAll: handleToggleAll,
    clearCart: handleClearCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
        {/* PAGE HEADER */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Shopping Cart
              </h1>

              {items.length > 0 && (
                <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {items.length}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Review your products before checkout
            </p>
          </div>

          <Link
            to="/products"
            className="text-xs font-medium text-gray-500 transition hover:text-black"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* EMPTY CART */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">
            {/* LEFT - CART PRODUCTS */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {/* CART HEADER */}
              <div className="flex h-12 items-center justify-between border-b border-gray-100 px-5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleToggleAll}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-black"
                  />

                  <span className="text-xs font-semibold text-gray-800">
                    Select all
                  </span>

                  <span className="text-[11px] text-gray-400">
                    ({items.length})
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-[11px] font-medium text-gray-400 transition hover:text-red-500"
                >
                  Clear all
                </button>
              </div>

              {/* PRODUCTS */}
              <div className="px-5">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onToggle={handleToggle}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              {/* BOTTOM */}
              <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Selected products
                  </span>

                  <span className="text-xs font-semibold text-gray-900">
                    {selectedQuantity} items
                  </span>
                </div>
              </div>
            </section>

            {/* RIGHT - SUMMARY */}
            <div className="lg:sticky lg:top-5">
              <CartSummary
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                total={total}
                voucher="SAVE10"
                appliedVoucher="SAVE10"
                selectedQuantity={selectedQuantity}
                setVoucher={() => {}}
                applyVoucher={() => {}}
                onCheckout={() => navigate("/checkout")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

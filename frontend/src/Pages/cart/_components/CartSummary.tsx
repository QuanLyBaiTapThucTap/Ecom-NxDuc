interface CartSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  voucher: string;
  appliedVoucher: string | null;
  selectedQuantity: number;
  setVoucher: (value: string) => void;
  applyVoucher: () => void;
}

const CartSummary = ({
  subtotal,
  discount,
  shipping,
  total,
  voucher,
  appliedVoucher,
  selectedQuantity,
  setVoucher,
  applyVoucher,
}: CartSummaryProps) => {
  const isInvalidVoucher =
    voucher.trim().length > 0 &&
    voucher.trim().toUpperCase() !== "SAVE10" &&
    !appliedVoucher;

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-5">
      {/* TITLE */}
      <div>
        <h2 className="text-base font-bold text-gray-900">Order Summary</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          {selectedQuantity} {selectedQuantity === 1 ? "item" : "items"}{" "}
          selected
        </p>
      </div>

      {/* VOUCHER */}
      <div className="mt-5">
        <label
          htmlFor="voucher"
          className="mb-2 block text-xs font-semibold text-gray-700"
        >
          Discount code
        </label>

        <div className="flex gap-2">
          <input
            id="voucher"
            type="text"
            value={voucher}
            onChange={(event) => setVoucher(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applyVoucher();
              }
            }}
            placeholder="Enter code"
            className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />

          <button
            type="button"
            onClick={applyVoucher}
            className="h-10 rounded-lg bg-gray-900 px-4 text-xs font-semibold text-white transition hover:bg-black"
          >
            Apply
          </button>
        </div>

        {appliedVoucher && (
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-green-600">
            <span>✓</span>
            <span>{appliedVoucher} applied — 10% off</span>
          </div>
        )}

        {isInvalidVoucher && (
          <p className="mt-2 text-[11px] text-red-500">
            Invalid discount code.
          </p>
        )}
      </div>

      {/* DIVIDER */}
      <div className="my-5 border-t border-gray-100" />

      {/* PRICE DETAILS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Subtotal</span>

          <span className="text-xs font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Discount</span>

          <span className="text-xs font-semibold text-green-600">
            {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Shipping</span>

          <span className="text-xs font-semibold text-green-600">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* TOTAL DIVIDER */}
      <div className="my-5 border-t border-gray-200" />

      {/* TOTAL */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-700">Total</p>

          <p className="mt-0.5 text-[10px] text-gray-400">
            Including all applicable fees
          </p>
        </div>

        <span className="text-2xl font-black tracking-tight text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* CHECKOUT */}
      <button
        type="button"
        disabled={selectedQuantity === 0}
        className="mt-6 h-11 w-full rounded-lg bg-black text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        Proceed to Checkout
      </button>

      {/* NOTE */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
        <span>🔒</span>
        <span>Secure and encrypted checkout</span>
      </div>
    </aside>
  );
};

export default CartSummary;

import CheckoutProductItem from "./CheckoutProductItem";

import type { CheckoutOrderItem } from "../_types/checkout";

interface CheckoutOrderSummaryProps {
  items: CheckoutOrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const CheckoutOrderSummary = ({
  items,
  subtotal,
  discount,
  shippingFee,
  total,
  isSubmitting,
  onSubmit,
}: CheckoutOrderSummaryProps) => {
  return (
    <aside className="lg:sticky lg:top-5">
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-bold text-gray-900">Order Summary</h2>

          <p className="mt-1 text-[11px] text-gray-400">
            {items.length} product{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="max-h-[320px] space-y-4 overflow-y-auto px-5 py-4">
          {items.map((item) => (
            <CheckoutProductItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Discount</span>
            <span className="font-medium text-green-600">
              -${discount.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Shipping</span>

            <span className="font-medium text-gray-900">
              {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
            </span>
          </div>

          <div className="my-4 border-t border-dashed border-gray-200" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-gray-400">Total</p>

              <p className="mt-0.5 text-xl font-black tracking-tight text-gray-900">
                ${total.toFixed(2)}
              </p>
            </div>

            <span className="text-[10px] text-gray-400">USD</span>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || items.length === 0}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-lg bg-black text-xs font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSubmitting ? "Processing Order..." : "Place Order"}
          </button>

          <p className="mt-3 text-center text-[9px] leading-4 text-gray-400">
            By placing your order, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutOrderSummary;

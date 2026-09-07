import type { CartItem as CartItemType } from "../_types/cart";

interface CartItemProps {
  item: CartItemType;
  onToggle: (productId: number) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem = ({
  item,
  onToggle,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const { product, quantity, selected } = item;

  const itemTotal = product.price * quantity;

  return (
    <div className="group flex gap-4 border-b border-gray-100 py-5 last:border-b-0">
      {/* CHECKBOX */}
      <div className="flex shrink-0 items-start pt-1">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(product.id)}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-black"
        />
      </div>

      {/* PRODUCT IMAGE */}
      <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              {product.category}
            </p>

            <h3 className="mt-1 line-clamp-2 max-w-[520px] text-sm font-semibold leading-5 text-gray-900">
              {product.title}
            </h3>

            {/* RATING */}
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[11px] tracking-tight text-yellow-500">
                {"★".repeat(Math.round(product.rating?.rate ?? 0))}
                {"☆".repeat(5 - Math.round(product.rating?.rate ?? 0))}
              </span>

              <span className="text-[11px] text-gray-500">
                {(product.rating?.rate ?? 0).toFixed(1)}
              </span>

              <span className="text-[10px] text-gray-400">
                ({product.rating?.count ?? 0})
              </span>
            </div>
          </div>

          {/* REMOVE */}
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="shrink-0 text-[11px] font-medium text-gray-400 transition hover:text-red-500"
          >
            Remove
          </button>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 flex items-end justify-between gap-4">
          {/* UNIT PRICE */}
          <div>
            <p className="text-[10px] text-gray-400">Unit price</p>

            <p className="mt-0.5 text-sm font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400">Quantity</span>

            <div className="flex h-8 items-center rounded-md border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => onDecrease(product.id)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-full w-8 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black disabled:cursor-not-allowed disabled:text-gray-200"
              >
                −
              </button>

              <span className="flex h-full min-w-8 items-center justify-center border-x border-gray-200 px-2 text-xs font-semibold text-gray-900">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => onIncrease(product.id)}
                aria-label="Increase quantity"
                className="flex h-full w-8 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
              >
                +
              </button>
            </div>
          </div>

          {/* TOTAL */}
          <div className="min-w-[90px] text-right">
            <p className="text-[10px] text-gray-400">Total</p>

            <p className="mt-0.5 text-base font-black text-gray-900">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

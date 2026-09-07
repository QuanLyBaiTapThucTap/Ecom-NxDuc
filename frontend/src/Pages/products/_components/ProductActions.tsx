import { useState } from "react";

import type { Product } from "../_types/product";

interface ProductActionsProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const ProductActions = ({
  product,
  quantity,
  onQuantityChange,
}: ProductActionsProps) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const maxQuantity =
    product.stock !== undefined && product.stock > 0 ? product.stock : 99;

  const totalPrice = product.price * quantity;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      return;
    }

    console.log("Buy now:", {
      productId: product.id,
      quantity,
      totalPrice,
    });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      {/* Quantity */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-900">Quantity</p>

          <p className="mt-1 text-[10px] text-gray-400">
            Maximum {maxQuantity} items
          </p>
        </div>

        <div className="flex h-9 items-center rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
            className="flex h-full w-9 items-center justify-center text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="flex h-full min-w-10 items-center justify-center border-x border-gray-200 text-xs font-semibold text-gray-900">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= maxQuantity || isOutOfStock}
            className="flex h-full w-9 items-center justify-center text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Total</span>

          <span className="text-xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex h-11 items-center justify-center rounded-lg border border-gray-900 bg-white px-3 text-xs font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
        >
          {addedToCart ? "✓ Added to Cart" : "🛒 Add to Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex h-11 items-center justify-center rounded-lg bg-gray-900 px-3 text-xs font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Buy Now
        </button>
      </div>

      {/* Stock warning */}
      {product.stock !== undefined &&
        product.stock > 0 &&
        product.stock <= 5 && (
          <p className="mt-3 text-center text-[10px] font-medium text-orange-600">
            ⚡ Only {product.stock} items left in stock
          </p>
        )}

      {/* Out of stock */}
      {isOutOfStock && (
        <p className="mt-3 text-center text-[10px] font-medium text-red-500">
          This product is currently out of stock.
        </p>
      )}

      {/* Trust information */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
        <div className="text-center">
          <div className="text-sm">🚚</div>

          <p className="mt-1 text-[9px] font-medium text-gray-700">
            Fast Delivery
          </p>
        </div>

        <div className="text-center">
          <div className="text-sm">🔒</div>

          <p className="mt-1 text-[9px] font-medium text-gray-700">
            Secure Payment
          </p>
        </div>

        <div className="text-center">
          <div className="text-sm">↩️</div>

          <p className="mt-1 text-[9px] font-medium text-gray-700">
            Easy Return
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductActions;

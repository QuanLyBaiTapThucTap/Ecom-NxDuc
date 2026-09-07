import { Link } from "react-router-dom";

import CartItem from "./_components/CartItem";
import CartSummary from "./_components/CartSummary";
import EmptyCart from "./_components/EmptyCart";

import type { CartItem as CartItemType } from "./_types/cart";

const fakeCartItems: CartItemType[] = [
  {
    product: {
      id: 1,
      title: "iPhone 15 Pro Max 256GB",
      price: 1199.99,
      description: "Apple iPhone 15 Pro Max",
      category: "Smartphones",
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600",
      rating: {
        rate: 4.8,
        count: 328,
      },
    },
    quantity: 1,
    selected: true,
  },
  {
    product: {
      id: 2,
      title: "Sony WH-1000XM5 Wireless Headphones",
      price: 349.99,
      description: "Premium wireless noise cancelling headphones",
      category: "Headphones",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
      rating: {
        rate: 4.7,
        count: 215,
      },
    },
    quantity: 2,
    selected: true,
  },
  {
    product: {
      id: 3,
      title: "MacBook Air M3 15-inch",
      price: 1299.99,
      description: "Apple MacBook Air with M3 chip",
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      rating: {
        rate: 4.9,
        count: 486,
      },
    },
    quantity: 1,
    selected: true,
  },
  {
    product: {
      id: 4,
      title: "Nike Air Max 270",
      price: 149.99,
      description: "Comfortable everyday sneakers",
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      rating: {
        rate: 4.6,
        count: 172,
      },
    },
    quantity: 1,
    selected: false,
  },
];

const CartPage = () => {
  const items = fakeCartItems;

  const selectedItems = items.filter((item) => item.selected);

  const selectedQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const discount = subtotal * 0.1;

  const shipping = 0;

  const total = subtotal - discount + shipping;

  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const handleToggle = (productId: number) => {
    const item = items.find((item) => item.product.id === productId);

    if (item) {
      item.selected = !item.selected;
    }
  };

  const handleIncrease = (productId: number) => {
    const item = items.find((item) => item.product.id === productId);

    if (item) {
      item.quantity += 1;
    }
  };

  const handleDecrease = (productId: number) => {
    const item = items.find((item) => item.product.id === productId);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  };

  const handleRemove = (productId: number) => {
    const index = items.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      items.splice(index, 1);
    }
  };

  const handleToggleAll = () => {
    items.forEach((item) => {
      item.selected = !allSelected;
    });
  };

  const handleClearCart = () => {
    items.splice(0, items.length);
  };

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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

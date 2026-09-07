import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import CheckoutHeader from "./_components/CheckoutHeader";
import ShippingForm from "./_components/ShippingForm";
import PaymentMethod from "./_components/PaymentMethod";
import CheckoutOrderSummary from "./_components/CheckoutOrderSummary";

import { useCheckout } from "./_hooks/useCheckout";

import type { CheckoutOrderItem } from "./_types/checkout";

const CheckoutPage = () => {
  const cartItems = [
    {
      selected: true,
      quantity: 1,
      product: {
        id: 1,
        title: "iPhone 15 Pro Max 256GB",
        price: 1199.99,
        image:
          "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500",
      },
    },
    {
      selected: true,
      quantity: 2,
      product: {
        id: 2,
        title: "Sony WH-1000XM5 Wireless Headphones",
        price: 349.99,
        image:
          "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
      },
    },
    {
      selected: true,
      quantity: 1,
      product: {
        id: 3,
        title: "MacBook Air M3 15-inch",
        price: 1299.99,
        image:
          "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=500",
      },
    },
    {
      selected: false,
      quantity: 1,
      product: {
        id: 4,
        title: "Nike Air Max 270",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      },
    },
  ];
  const navigate = useNavigate();

  const { form, errors, isSubmitting, isSuccess, updateField, submitOrder } =
    useCheckout();

  /*
   * Tạm thời lấy dữ liệu cart từ localStorage.
   *
   * Sau này khi Cart chuyển sang Zustand,
   * phần này nên lấy trực tiếp từ useCartStore().
   */
  // const cartItems = useMemo(() => {
  //   try {
  //     const stored = localStorage.getItem("ecom-cart");

  //     if (!stored) {
  //       return [];
  //     }

  //     const parsed = JSON.parse(stored);

  //     if (!Array.isArray(parsed)) {
  //       return [];
  //     }

  //     return parsed;
  //   } catch {
  //     return [];
  //   }
  // }, []);

  /*
   * Chỉ lấy những sản phẩm được chọn để checkout.
   */
  const items: CheckoutOrderItem[] = cartItems
    .filter((item) => item?.selected && item?.product)
    .map((item) => ({
      productId: item.product.id,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

  /*
   * Tính tiền hàng.
   */
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  /*
   * Discount.
   *
   * Hiện tại checkout chưa áp dụng voucher.
   * Có thể lấy từ Cart Store sau này.
   */
  const discount = 0;

  /*
   * Miễn phí vận chuyển nếu đơn từ $100.
   * Đơn dưới $100 tính phí $10.
   */
  const shippingFee = subtotal >= 100 ? 0 : subtotal > 0 ? 10 : 0;

  /*
   * Tổng tiền cuối cùng.
   */
  const total = subtotal - discount + shippingFee;

  /*
   * Submit order.
   */
  const handleSubmit = async () => {
    const order = {
      items,
      shipping: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        district: form.district,
        note: form.note,
      },
      paymentMethod: form.paymentMethod,
      subtotal,
      discount,
      shippingFee,
      total,
    };

    const success = await submitOrder(order);

    if (success) {
      localStorage.removeItem("ecom-cart");
    }
  };

  /*
   * Order success screen.
   */
  if (isSuccess) {
    return (
      <div className="min-h-[70vh] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[600px] items-center justify-center px-4 py-10">
          <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
            {/* SUCCESS ICON */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">
              ✓
            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-xl font-bold tracking-tight text-gray-900">
              Order Placed Successfully
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-500">
              Thank you for your purchase. We have received your order and will
              process it shortly.
            </p>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                to="/account/orders"
                className="flex h-10 items-center justify-center rounded-lg bg-black px-6 text-xs font-bold text-white transition hover:bg-gray-800"
              >
                View My Orders
              </Link>

              <Link
                to="/products"
                className="flex h-10 items-center justify-center rounded-lg border border-gray-200 px-6 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Empty cart screen.
   */
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[600px] items-center justify-center px-4 py-10">
          <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
            {/* ICON */}
            <div className="text-4xl">🛒</div>

            {/* TITLE */}
            <h1 className="mt-4 text-lg font-bold text-gray-900">
              Your cart is empty
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-1 text-xs text-gray-500">
              Add some products before proceeding to checkout.
            </p>

            {/* ACTION */}
            <Link
              to="/products"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-black px-6 text-xs font-bold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Main checkout page.
   */
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-7">
        {/* PAGE HEADER */}
        <CheckoutHeader />

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* SHIPPING INFORMATION */}
            <ShippingForm form={form} errors={errors} onChange={updateField} />

            {/* PAYMENT METHOD */}
            <PaymentMethod
              value={form.paymentMethod}
              onChange={(value) => updateField("paymentMethod", value)}
            />

            {/* BACK TO CART */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="text-xs font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to Cart
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            total={total}
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

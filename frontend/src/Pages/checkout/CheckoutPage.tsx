import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { analyticsService } from "@/Services/analyticsService";

import CheckoutHeader from "./_components/CheckoutHeader";
import ShippingForm from "./_components/ShippingForm";
import PaymentMethod from "./_components/PaymentMethod";
import CheckoutOrderSummary from "./_components/CheckoutOrderSummary";

import { useCheckout } from "./_hooks/useCheckout";
import { useCart } from "@/Pages/cart/_hooks/useCart";

import type { CheckoutOrderItem } from "./_types/checkout";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  // Hiển thị modal xác nhận đặt hàng
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // =========================================================
  // CART
  // =========================================================

  const {
    selectedItems: cartItems,
    discount,
    appliedVoucher,
    removeItem,
  } = useCart();

  // =========================================================
  // CHECKOUT
  // =========================================================

  const {
    form,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    updateField,
    submitOrder,
  } = useCheckout();

  // =========================================================
  // CHECKOUT ITEMS
  // =========================================================

  const items: CheckoutOrderItem[] = cartItems.map((item) => ({
    productId: item.product.id,
    title: item.product.title,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
  }));

  // =========================================================
  // PRICE CALCULATION
  // =========================================================

  // Tổng tiền sản phẩm
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Miễn phí vận chuyển nếu đơn từ $100.
  // Đơn dưới $100 tính phí $10.
  const shippingFee = subtotal >= 100 ? 0 : subtotal > 0 ? 10 : 0;

  // Tổng tiền cuối cùng
  const total = Math.max(0, subtotal - discount + shippingFee);

  // =========================================================
  // OPEN CONFIRM MODAL
  // =========================================================

  /**
   * Không submit ngay.
   *
   * Khi người dùng bấm "Place Order" ở CheckoutOrderSummary,
   * chỉ mở modal xác nhận.
   */
  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // =========================================================
  // CONFIRM ORDER
  // =========================================================

  /**
   * Chỉ function này mới thực sự tạo order.
   *
   * Flow:
   *
   * Confirm
   *   ↓
   * submitOrder()
   *   ↓
   * createOrder()
   *   ↓
   * analytics
   *   ↓
   * remove cart items
   */
  const handleConfirmOrder = async () => {
    // Đóng modal
    setShowConfirmModal(false);

    // =======================================================
    // CHECKOUT DATA
    // =======================================================

    const checkoutOrder = {
      items,

      voucher: appliedVoucher,

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

    // =======================================================
    // SUBMIT CHECKOUT
    // =======================================================

    const savedOrder = await submitOrder(checkoutOrder);

    // Validate thất bại
    if (!savedOrder) {
      return;
    }

    // =======================================================
    // ANALYTICS
    // =======================================================

    analyticsService.track("ORDER_CREATED", {
      orderId: String(savedOrder.id),
      orderTotal: savedOrder.total,
    });

    // =======================================================
    // REMOVE CHECKED OUT ITEMS
    // =======================================================

    items.forEach((item) => {
      removeItem(item.productId);
    });

    // =======================================================
    // SUCCESS TOAST
    // =======================================================

    toast.success("Order placed successfully!", {
      description: `Order #${savedOrder.id} has been created.`,
    });
  };

  // =========================================================
  // SUCCESS SCREEN
  // =========================================================

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[600px] items-center justify-center px-4 py-10">
          <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
            {/* Success icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">
              ✓
            </div>

            {/* Title */}
            <h1 className="mt-5 text-xl font-bold tracking-tight text-gray-900">
              Order Placed Successfully
            </h1>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-500">
              Thank you for your purchase. We have received your order and will
              process it shortly.
            </p>

            {/* Actions */}
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

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[600px] items-center justify-center px-4 py-10">
          <div className="w-full rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
            {/* Icon */}
            <div className="text-4xl">🛒</div>

            {/* Title */}
            <h1 className="mt-4 text-lg font-bold text-gray-900">
              Your cart is empty
            </h1>

            {/* Description */}
            <p className="mt-1 text-xs text-gray-500">
              Add some products before proceeding to checkout.
            </p>

            {/* Action */}
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

  // =========================================================
  // MAIN CHECKOUT PAGE
  // =========================================================

  return (
    <>
      <div className="min-h-screen bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-7">
          {/* Page header */}
          <CheckoutHeader />

          {/* Submit error */}
          {submitError && (
            <p
              role="alert"
              className="my-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600"
            >
              {submitError}
            </p>
          )}

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-5">
              {/* Shipping information */}
              <ShippingForm
                form={form}
                errors={errors}
                onChange={updateField}
              />

              {/* Payment method */}
              <PaymentMethod
                value={form.paymentMethod}
                onChange={(value) => updateField("paymentMethod", value)}
              />

              {/* Back to cart */}
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="text-xs font-medium text-gray-500 transition hover:text-black"
              >
                ← Back to Cart
              </button>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <CheckoutOrderSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              shippingFee={shippingFee}
              total={total}
              isSubmitting={isSubmitting}
              onSubmit={handleOpenConfirmModal}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          CONFIRM ORDER MODAL
      ===================================================== */}

      {showConfirmModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowConfirmModal(false);
            }
          }}
        >
          <div className="w-full max-w-[460px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    Order confirmation
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    Confirm your order
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-400 transition hover:bg-gray-100 hover:text-black"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* =================================================
                MODAL CONTENT
            ================================================= */}

            <div className="px-6 py-5">
              <p className="text-sm leading-6 text-gray-600">
                Please check your order information before confirming your
                purchase.
              </p>

              {/* Customer */}
              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Customer
                </p>

                <div className="mt-2 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {form.fullName || "Not provided"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {form.phone || "No phone number"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {form.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="mt-3 rounded-xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Shipping address
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-700">
                  {form.address || "Not provided"}
                  {form.district ? `, ${form.district}` : ""}
                  {form.city ? `, ${form.city}` : ""}
                </p>
              </div>

              {/* Payment */}
              <div className="mt-3 rounded-xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Payment method
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {form.paymentMethod}
                </p>
              </div>

              {/* Product count */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                <span className="text-xs text-gray-500">Products</span>

                <span className="text-xs font-semibold text-gray-900">
                  {items.reduce((count, item) => count + item.quantity, 0)}{" "}
                  item(s)
                </span>
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-sm font-bold text-gray-900">Total</span>

                <span className="text-xl font-bold text-black">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* =================================================
                MODAL ACTIONS
            ================================================= */}

            <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="flex h-11 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Go Back
              </button>

              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="flex h-11 flex-1 items-center justify-center rounded-lg bg-black px-4 text-xs font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;

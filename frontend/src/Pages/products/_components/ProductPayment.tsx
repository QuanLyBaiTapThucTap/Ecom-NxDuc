import type { PaymentMethod } from "../_types/payment";

interface ProductPaymentProps {
  selectedPayment: PaymentMethod;
  onPaymentChange: (value: PaymentMethod) => void;
}

const paymentMethods: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💵",
  },
  {
    value: "banking",
    label: "Bank Transfer",
    description: "Transfer directly to our bank account",
    icon: "🏦",
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    description: "Secure payment with your card",
    icon: "💳",
  },
  {
    value: "ewallet",
    label: "E-Wallet",
    description: "Pay with your preferred e-wallet",
    icon: "📱",
  },
];

const ProductPayment = ({
  selectedPayment,
  onPaymentChange,
}: ProductPaymentProps) => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">Payment Method</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Choose your preferred payment method
        </p>
      </div>

      <div className="space-y-2">
        {paymentMethods.map((method) => {
          const isSelected = selectedPayment === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => onPaymentChange(method.value)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                isSelected
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              {/* Radio */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  isSelected ? "border-gray-900" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-gray-900" />
                )}
              </span>

              {/* Icon */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
                {method.icon}
              </span>

              {/* Content */}
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-gray-900">
                  {method.label}
                </span>

                <span className="mt-0.5 block text-[10px] leading-4 text-gray-500">
                  {method.description}
                </span>
              </span>

              {/* Selected */}
              {isSelected && (
                <span className="text-[10px] font-semibold text-gray-900">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
        <span className="text-xs">🔒</span>

        <p className="text-[10px] leading-4 text-gray-500">
          Your payment information is protected and securely processed.
        </p>
      </div>
    </section>
  );
};

export default ProductPayment;

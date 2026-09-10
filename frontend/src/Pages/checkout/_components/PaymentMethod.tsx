import type { PaymentMethod as PaymentMethodType } from "../_types/checkout";

interface PaymentMethodProps {
  value: PaymentMethodType;
  onChange: (value: PaymentMethodType) => void;
}

const PaymentMethod = ({ value, onChange }: PaymentMethodProps) => {
  const methods: {
    value: PaymentMethodType;
    title: string;
    description: string;
  }[] = [
    {
      value: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order arrives.",
    },
    {
      value: "banking",
      title: "Bank Transfer",
      description: "Transfer directly to our bank account.",
    },
    {
      value: "card",
      title: "Credit / Debit Card",
      description: "Secure payment via your bank card.",
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900">Payment Method</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Select your preferred payment method.
        </p>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-2 p-5">
        {methods.map((method) => {
          const selected = value === method.value;

          return (
            <button
              key={method.value}
              type="button"
              disabled={method.value !== "cod"}
              onClick={() => onChange(method.value)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                selected
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* RADIO */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  selected ? "border-black" : "border-gray-300"
                }`}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-black" />}
              </span>

              {/* CONTENT */}
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-gray-900">
                  {method.title}
                </span>

                <span className="mt-0.5 block text-[10px] text-gray-400">
                  {method.value === "cod" ? method.description : "Currently unavailable"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethod;

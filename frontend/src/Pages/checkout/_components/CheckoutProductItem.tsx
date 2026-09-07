import type { CheckoutOrderItem } from "../_types/checkout";

interface CheckoutProductItemProps {
  item: CheckoutOrderItem;
}

const CheckoutProductItem = ({ item }: CheckoutProductItemProps) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain p-2"
        />

        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
          {item.quantity}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-semibold leading-4 text-gray-900">
          {item.title}
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
      </div>

      <p className="shrink-0 text-xs font-bold text-gray-900">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CheckoutProductItem;

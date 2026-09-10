import type { Order } from "@/Pages/checkout/_services/orderService";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

const statusConfig: Record<
  Order["status"],
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },

  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },

  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1",
        "text-[11px] font-semibold",
        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;

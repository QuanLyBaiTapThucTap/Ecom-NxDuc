import type { Product } from "../_types/product";

interface ProductGiftsProps {
  product: Product;
}

const ProductGifts = ({ product }: ProductGiftsProps) => {
  const gifts = product.gifts ?? [];

  if (gifts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-sm">
          🎁
        </span>

        <div>
          <h2 className="text-sm font-bold text-gray-900">Gifts Included</h2>

          <p className="mt-0.5 text-[10px] text-gray-400">
            Free gifts included with your purchase
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {gifts.map((gift, index) => (
          <div
            key={`${gift.name}-${index}`}
            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            {/* Gift image */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              {gift.image ? (
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl">🎁</span>
              )}
            </div>

            {/* Gift information */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-semibold text-gray-900">
                  {gift.name}
                </h3>

                <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-600">
                  FREE
                </span>
              </div>

              {gift.description && (
                <p className="mt-1 text-[10px] leading-4 text-gray-500">
                  {gift.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-dashed border-gray-200 px-3 py-2.5">
        <p className="text-[10px] text-gray-500">
          🎁 Gifts are automatically included with your order.
        </p>
      </div>
    </section>
  );
};

export default ProductGifts;

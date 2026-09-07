import type { Product } from "../_types/product";

interface ProductPromotionProps {
  product: Product;
}

const ProductPromotion = ({ product }: ProductPromotionProps) => {
  const promotions = product.promotions ?? [];

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-sm">
            🎁
          </span>

          <div>
            <h2 className="text-sm font-bold text-gray-900">Special Offers</h2>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Exclusive benefits for this product
            </p>
          </div>
        </div>
      </div>

      {/* Promotion list */}
      <div className="divide-y divide-gray-100">
        {promotions.map((promotion, index) => (
          <div
            key={`${promotion.title}-${index}`}
            className="flex gap-3 px-5 py-3"
          >
            {/* Check icon */}
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
              ✓
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900">
                {promotion.title}
              </p>

              {promotion.description && (
                <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
                  {promotion.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPromotion;

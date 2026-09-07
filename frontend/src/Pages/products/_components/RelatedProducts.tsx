import { Link } from "react-router-dom";

import type { Product } from "../_types/product";

interface RelatedProductsProps {
  products: Product[];
  currentProduct: Product;
}

const RelatedProducts = ({
  products,
  currentProduct,
}: RelatedProductsProps) => {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id,
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <section className="border-t border-gray-200 py-8">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Related Products
          </h2>

          <p className="mt-1 text-[11px] text-gray-400">
            More products from the same category
          </p>
        </div>

        <Link
          to={`/products?category=${encodeURIComponent(
            currentProduct.category,
          )}`}
          className="text-[11px] font-semibold text-gray-700 underline underline-offset-2 transition hover:text-black"
        >
          View all
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {relatedProducts.map((product) => {
          const oldPrice = product.price * 1.2;

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Sale */}
                {oldPrice > product.price && (
                  <span className="absolute left-2 top-2 rounded-md bg-red-500 px-1.5 py-1 text-[9px] font-bold text-white">
                    SALE
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="mb-1 text-[9px] font-medium uppercase text-gray-400">
                  {product.category}
                </p>

                <h3 className="line-clamp-2 min-h-[32px] text-xs font-semibold leading-4 text-gray-900">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[10px] text-yellow-400">★</span>

                  <span className="text-[10px] font-medium text-gray-700">
                    {product.rating.rate.toFixed(1)}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    ({product.rating.count})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>

                  <span className="text-[10px] text-gray-400 line-through">
                    {formatPrice(oldPrice)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;

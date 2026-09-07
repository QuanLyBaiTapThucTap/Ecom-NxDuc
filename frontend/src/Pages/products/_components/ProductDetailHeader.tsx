import type { Product } from "../_types/product";

interface ProductDetailHeaderProps {
  product: Product;
}

const ProductDetailHeader = ({ product }: ProductDetailHeaderProps) => {
  const oldPrice = product.oldPrice ?? product.price * 1.2;

  const discount =
    oldPrice > product.price
      ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
      : 0;

  const isInStock = product.stock === undefined || product.stock > 0;

  return (
    <section className="border-b border-gray-200 pb-5">
      {/* Brand */}
      {product.brand && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          {product.brand}
        </p>
      )}

      {/* Product title */}
      <h1 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl">
        {product.title}
      </h1>

      {/* Rating + product code */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-900">
            {product.rating.rate.toFixed(1)}
          </span>

          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                {index < Math.round(product.rating.rate) ? "★" : "☆"}
              </span>
            ))}
          </div>

          <span className="text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>

        <span className="hidden h-3 w-px bg-gray-300 sm:block" />

        <span className="text-gray-500">
          Product ID:{" "}
          <span className="font-medium text-gray-700">#{product.id}</span>
        </span>
      </div>

      {/* Price */}
      <div className="mt-5 rounded-lg bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-end gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {oldPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-md bg-red-100 px-2 py-1 text-[10px] font-bold text-red-600">
              -{discount}%
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] text-gray-500">
          Price includes applicable taxes
        </p>
      </div>

      {/* Stock */}
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`h-2 w-2 rounded-full ${
            isInStock ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span
          className={
            isInStock
              ? "font-medium text-green-600"
              : "font-medium text-red-600"
          }
        >
          {isInStock ? "In Stock" : "Out of Stock"}
        </span>

        {isInStock && product.stock !== undefined && product.stock > 0 && (
          <span className="text-gray-400">
            • {product.stock} products available
          </span>
        )}
      </div>
    </section>
  );
};

export default ProductDetailHeader;

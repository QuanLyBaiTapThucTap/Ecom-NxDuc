import { Link } from "react-router-dom";
import { useProducts } from "@/Pages/products/_hooks/useProducts";

const FeaturedProductShowcase = () => {
  const { products, loading, error } = useProducts();

  const showcaseProducts = products.slice(0, 4);

  if (loading) {
    return (
      <section className="mx-auto mt-10 w-full max-w-[1200px] px-4">
        <div className="h-[460px] animate-pulse rounded-2xl bg-gray-100" />
      </section>
    );
  }

  if (error || showcaseProducts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px] px-4">
      {/* HEADER */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Featured Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Discover our most outstanding products
          </p>
        </div>

        <Link
          to="/products"
          className="hidden text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
        >
          View All
        </Link>
      </div>

      {/* SHOWCASE */}
      <div className="group/showcase flex h-[460px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {showcaseProducts.map((product, index) => {
          const isFeatured = index === 0;

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`
                group
                relative
                block
                h-full
                min-w-0
                cursor-pointer
                overflow-hidden
                border-r
                border-gray-200
                last:border-r-0
                transition-[flex]
                duration-700
                ease-out
                ${isFeatured ? "flex-[4]" : "flex-[2]"}
              `}
            >
              {/* IMAGE BACKGROUND */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className={`
                    h-full
                    w-full
                    object-contain
                    p-8
                    transition-transform
                    duration-700
                    ease-out
                    ${isFeatured ? "scale-100" : "scale-[0.7]"}
                    group-hover:scale-100
                  `}
                />
              </div>

              {/* DARK HOVER OVERLAY */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/5" />

              {/* GRADIENT */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* FEATURED LABEL */}
              {isFeatured && (
                <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform duration-300 group-hover:scale-105">
                  Featured
                </div>
              )}

              {/* PRODUCT INFO */}
              <div
                className={`
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  p-6
                  transition-all
                  duration-500
                  ${
                    isFeatured
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }
                  group-hover:translate-y-0
                  group-hover:opacity-100
                `}
              >
                {/* CATEGORY */}
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/70">
                  {product.category}
                </p>

                {/* TITLE */}
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">
                  {product.title}
                </h3>

                {/* PRICE */}
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-sm text-white/50 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {/* RATING */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-yellow-400">
                    {"★".repeat(Math.round(product.rating?.rate ?? 0))}
                    {"☆".repeat(5 - Math.round(product.rating?.rate ?? 0))}
                  </span>

                  <span className="text-xs text-white/70">
                    {product.rating?.rate?.toFixed(1)}
                  </span>
                </div>

                {/* VIEW DETAIL */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                    View Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>

              {/* HOVER BORDER */}
              <div className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-black/10" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProductShowcase;

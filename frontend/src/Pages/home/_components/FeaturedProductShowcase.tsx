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

        <button
          type="button"
          className="hidden text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
        >
          View All
        </button>
      </div>

      {/* PRODUCT SHOWCASE */}
      <div className="featured-showcase flex h-[460px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {showcaseProducts.map((product, index) => {
          const isFeatured = index === 0;

          return (
            <article
              key={product.id}
              className={`featured-item relative h-full min-w-0 overflow-hidden border-r border-gray-200 last:border-r-0 ${
                isFeatured ? "is-featured" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="featured-product-image h-full w-full object-contain p-8"
                />
              </div>

              {/* GRADIENT */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* PRODUCT INFO */}
              <div
                className={`featured-product-info absolute inset-x-0 bottom-0 z-10 p-6 ${
                  isFeatured ? "featured-visible" : ""
                }`}
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/70">
                  {product.category}
                </p>

                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">
                  {product.title}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-sm text-white/50 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-yellow-400">
                    {"★".repeat(Math.round(product.rating?.rate ?? 0))}
                  </span>

                  <span className="text-xs text-white/70">
                    {product.rating?.rate?.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* FEATURED BADGE */}
              {isFeatured && (
                <div className="absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  Featured
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProductShowcase;

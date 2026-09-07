import ProductCard from "@/Pages/products/_components/ProductCard";
import { useProducts } from "@/Pages/products/_hooks/useProducts";

const BestWeeklyDeals = () => {
  const { products, loading, error } = useProducts();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Best Weekly Deals
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Deals you don't want to miss
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-500"
          >
            View All
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-[220px] rounded-lg bg-gray-100" />

                <div className="mt-4 h-3 w-20 rounded bg-gray-100" />

                <div className="mt-2 h-4 w-full rounded bg-gray-100" />

                <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />

                <div className="mt-3 h-5 w-24 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-red-100 bg-red-50 py-10 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
};

export default BestWeeklyDeals;

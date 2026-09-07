import ProductCard from "@/Pages/products/_components/ProductCard";
import { useProducts } from "@/Pages/products/_hooks/useProducts";

const BestSellingSpeakers = () => {
  const { products, loading, error } = useProducts();

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Best Selling Speakers</h2>

          <button
            type="button"
            className="text-sm font-medium underline underline-offset-4"
          >
            View All
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-[330px] animate-pulse rounded-lg bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-10 text-center text-sm text-red-500">{error}</div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellingSpeakers;

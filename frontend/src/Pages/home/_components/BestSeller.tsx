import { useMemo, useState } from "react";

import ProductCard from "@/Pages/products/_components/ProductCard";
import { useProducts } from "@/Pages/products/_hooks/useProducts";

const categories = [
  "All",
  "Computers",
  "Mobiles",
  "Televisions",
  "Cameras",
  "Audios",
];

const BestSeller = () => {
  const { products, loading, error } = useProducts();

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) =>
      product.category.name
        .toLowerCase()
        .includes(activeCategory.toLowerCase()),
    );
  }, [products, activeCategory]);

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Best Seller
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Our most popular products
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-6 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap border-b-2 pb-2 text-sm transition ${
                    isActive
                      ? "border-black font-semibold text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
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
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No products found in this category.
            </p>
          </div>
        )}

        {/* View All */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              className="border-b border-black pb-1 text-sm font-medium text-black transition hover:text-gray-500"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;

import { useMemo, useState } from "react";

import ProductCard from "@/Pages/products/_components/ProductCard";
import { useProducts } from "@/Pages/products/_hooks/useProducts";

const tabs = ["Recommend For You", "Top Best Seller", "Top Rated"] as const;

type Tab = (typeof tabs)[number];

const SuggestToday = () => {
  const { products, loading, error } = useProducts();

  const [activeTab, setActiveTab] = useState<Tab>("Recommend For You");

  const displayedProducts = useMemo(() => {
    switch (activeTab) {
      case "Top Best Seller":
        return [...products].sort((a, b) => b.id - a.id).slice(0, 5);

      case "Top Rated":
        return products.slice(0, 5);

      case "Recommend For You":
      default:
        return products.slice(0, 5);
    }
  }, [products, activeTab]);

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-bold">Suggest Today</h2>

          {/* Tabs */}
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 pb-2 text-sm transition ${
                    isActive
                      ? "border-black font-semibold text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-[400px] animate-pulse rounded-lg bg-gray-100"
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
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && displayedProducts.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
};

export default SuggestToday;

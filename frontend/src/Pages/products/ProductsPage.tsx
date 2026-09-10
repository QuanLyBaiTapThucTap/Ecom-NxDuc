import { useMemo } from "react";

import { useSearchParams } from "react-router-dom";
import ProductCard from "./_components/ProductCard";
import { useProducts } from "./_hooks/useProducts";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const query = params.get("q") || "";
  const update = (key: string, value: string) => setParams(current => { const next = new URLSearchParams(current); if (value && value !== "all") next.set(key, value); else next.delete(key); return next; });

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Products loaded from the store API
            </p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => update("q", event.target.value)}
            placeholder="Search products"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-black sm:w-64"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto py-5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => update("category", item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold capitalize ${
                category === item
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && (
          <p className="py-16 text-center text-sm text-gray-500">
            Loading products...
          </p>
        )}
        {error && (
          <p className="py-16 text-center text-sm text-red-500">{error}</p>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            No products found.
          </p>
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

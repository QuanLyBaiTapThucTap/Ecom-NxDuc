import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./_components/ProductCard";
import { useProducts } from "./_hooks/useProducts";

const ITEMS_PER_PAGE = 12;

const categoryLabels: Record<string, string> = {
  computers: "Computers",
  mobiles: "Mobiles",
  televisions: "Televisions",
  audios: "Audios",
  accessories: "Accessories",
};

const pricePresets = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 to $500", min: 100, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
  { label: "Over $1,000", min: 1000, max: undefined },
];

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [params, setParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // URL State
  const category = params.get("category") || "all";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "default";
  const minPriceParam = params.get("minPrice");
  const maxPriceParam = params.get("maxPrice");
  const pageParam = parseInt(params.get("page") || "1", 10);
  const currentPage = Number.isSafeInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  // Local price input state
  const [minInput, setMinInput] = useState(minPriceParam || "");
  const [maxInput, setMaxInput] = useState(maxPriceParam || "");

  const updateParam = (key: string, value: string | undefined) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value !== undefined && value !== "" && value !== "all") {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      if (key !== "page") {
        next.delete("page"); // Reset to page 1 on filter change
      }
      return next;
    });
  };

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (minInput.trim()) next.set("minPrice", minInput.trim());
      else next.delete("minPrice");
      if (maxInput.trim()) next.set("maxPrice", maxInput.trim());
      else next.delete("maxPrice");
      next.delete("page");
      return next;
    });
  };

  const handleResetFilters = () => {
    setMinInput("");
    setMaxInput("");
    setParams(new URLSearchParams());
  };

  // Categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    const list = Object.keys(counts).sort();
    return [{ id: "all", label: "All Categories", count: products.length }, ...list.map((cat) => ({
      id: cat,
      label: categoryLabels[cat] || cat,
      count: counts[cat] || 0,
    }))];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const minP = minPriceParam ? parseFloat(minPriceParam) : undefined;
    const maxP = maxPriceParam ? parseFloat(maxPriceParam) : undefined;

    let result = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        (product.brand && product.brand.toLowerCase().includes(normalizedQuery));

      const matchesMin = minP === undefined || product.price >= minP;
      const matchesMax = maxP === undefined || product.price <= maxP;

      return matchesCategory && matchesQuery && matchesMin && matchesMax;
    });

    // Sorting
    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, category, query, minPriceParam, maxPriceParam, sort]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, validPage]);

  const hasActiveFilters = category !== "all" || query || minPriceParam || maxPriceParam || sort !== "default";

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-8">
        {/* BREADCRUMB */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">Products</span>
        </nav>

        {/* HEADER BAR */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {category === "all" ? "All Products" : categoryLabels[category] || category}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH INPUT */}
            <div className="relative min-w-[240px] flex-1 sm:flex-none">
              <input
                type="search"
                value={query}
                onChange={(e) => updateParam("q", e.target.value)}
                placeholder="Search products, brands..."
                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 pl-9 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
              />
              <span className="absolute left-3 top-2.5 text-sm text-gray-400">🔍</span>
            </div>

            {/* SORT SELECTOR */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="hidden text-xs text-gray-500 sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-800 outline-none transition hover:border-gray-400 focus:border-black"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* MOBILE FILTER TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 md:hidden"
            >
              <span>⚙️</span>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FILTERS PILLS */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-400">Active filters:</span>
            {category !== "all" && (
              <button
                type="button"
                onClick={() => updateParam("category", undefined)}
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-gray-800"
              >
                <span>Category: {categoryLabels[category] || category}</span>
                <span className="text-gray-400 hover:text-white">✕</span>
              </button>
            )}
            {query && (
              <button
                type="button"
                onClick={() => updateParam("q", undefined)}
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-gray-800"
              >
                <span>"{query}"</span>
                <span className="text-gray-400 hover:text-white">✕</span>
              </button>
            )}
            {(minPriceParam || maxPriceParam) && (
              <button
                type="button"
                onClick={() => {
                  setMinInput("");
                  setMaxInput("");
                  setParams((curr) => {
                    const n = new URLSearchParams(curr);
                    n.delete("minPrice");
                    n.delete("maxPrice");
                    return n;
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-gray-800"
              >
                <span>
                  Price: ${minPriceParam || 0} - {maxPriceParam ? `$${maxPriceParam}` : "∞"}
                </span>
                <span className="text-gray-400 hover:text-white">✕</span>
              </button>
            )}
            {sort !== "default" && (
              <button
                type="button"
                onClick={() => updateParam("sort", undefined)}
                className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-gray-800"
              >
                <span>Sorted</span>
                <span className="text-gray-400 hover:text-white">✕</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-medium text-red-500 underline transition hover:text-red-700 ml-2"
            >
              Reset all
            </button>
          </div>
        )}

        {/* MAIN LAYOUT: SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* SIDEBAR FILTERS (DESKTOP + MOBILE DRAWER) */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-2xl transition-transform duration-300 md:static md:z-auto md:w-auto md:rounded-2xl md:border md:border-gray-200 md:p-5 md:shadow-sm
              ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            {/* Mobile close button */}
            <div className="mb-4 flex items-center justify-between border-b pb-3 md:hidden">
              <span className="font-bold text-gray-900">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* CATEGORIES SECTION */}
            <div className="border-b border-gray-100 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Categories
              </h3>
              <div className="mt-3 space-y-1">
                {categories.map((cat) => {
                  const isActive = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        updateParam("category", cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition ${
                        isActive
                          ? "bg-gray-900 font-semibold text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span
                        className={`text-[11px] ${
                          isActive ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRICE FILTER SECTION */}
            <div className="pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Price Range
              </h3>

              {/* Price Presets */}
              <div className="mt-3 space-y-1">
                {pricePresets.map((preset) => {
                  const isPresetActive =
                    (preset.min === undefined && !minPriceParam && preset.max === undefined && !maxPriceParam) ||
                    (preset.min !== undefined &&
                      minPriceParam === String(preset.min) &&
                      preset.max !== undefined &&
                      maxPriceParam === String(preset.max)) ||
                    (preset.min !== undefined &&
                      minPriceParam === String(preset.min) &&
                      preset.max === undefined &&
                      !maxPriceParam);

                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setMinInput(preset.min !== undefined ? String(preset.min) : "");
                        setMaxInput(preset.max !== undefined ? String(preset.max) : "");
                        setParams((curr) => {
                          const n = new URLSearchParams(curr);
                          if (preset.min !== undefined) n.set("minPrice", String(preset.min));
                          else n.delete("minPrice");
                          if (preset.max !== undefined) n.set("maxPrice", String(preset.max));
                          else n.delete("maxPrice");
                          n.delete("page");
                          return n;
                        });
                        setMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs transition ${
                        isPresetActive
                          ? "font-bold text-gray-900 underline"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom price inputs */}
              <form onSubmit={handleApplyCustomPrice} className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-[11px] font-semibold text-gray-500">Custom Price ($)</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minInput}
                    onChange={(e) => setMinInput(e.target.value)}
                    className="h-8 w-full rounded-lg border border-gray-200 px-2 text-xs outline-none focus:border-black"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxInput}
                    onChange={(e) => setMaxInput(e.target.value)}
                    className="h-8 w-full rounded-lg border border-gray-200 px-2 text-xs outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2.5 w-full rounded-lg bg-gray-900 py-1.5 text-xs font-semibold text-white transition hover:bg-black"
                >
                  Apply Filter
                </button>
              </form>
            </div>
          </aside>

          {/* BACKDROP FOR MOBILE FILTER */}
          {mobileFilterOpen && (
            <div
              role="presentation"
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
            />
          )}

          {/* RIGHT PRODUCT DISPLAY */}
          <main className="min-w-0">
            {/* LOADING STATE */}
            {loading && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-xl bg-white p-4 border border-gray-200">
                    <div className="h-44 w-full rounded-lg bg-gray-100" />
                    <div className="mt-4 h-3 w-16 rounded bg-gray-100" />
                    <div className="mt-2 h-4 w-full rounded bg-gray-100" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />
                    <div className="mt-3 h-5 w-20 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            )}

            {/* ERROR STATE */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-2xl">⚠️</p>
                <p className="mt-2 text-sm font-semibold text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  Retry Loading
                </button>
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                <div className="text-5xl">🔍</div>
                <h3 className="mt-3 text-lg font-bold text-gray-900">No products found</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Try adjusting your keywords, price range, or filter options.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-black"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* PRODUCT GRID */}
            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row">
                    <p className="text-xs text-gray-500">
                      Showing{" "}
                      <span className="font-semibold text-gray-900">
                        {(validPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-gray-900">
                        {Math.min(validPage * ITEMS_PER_PAGE, filteredProducts.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900">{filteredProducts.length}</span> results
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          updateParam("page", String(validPage - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={validPage <= 1}
                        className="flex h-9 items-center justify-center rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Prev
                      </button>

                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        // Only show first, last, and window around current page
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= validPage - 1 && pageNum <= validPage + 1)
                        ) {
                          const isCurrent = pageNum === validPage;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => {
                                updateParam("page", String(pageNum));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition ${
                                isCurrent
                                  ? "bg-gray-900 text-white"
                                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        if (
                          (pageNum === validPage - 2 && pageNum > 1) ||
                          (pageNum === validPage + 2 && pageNum < totalPages)
                        ) {
                          return (
                            <span key={pageNum} className="px-1 text-xs text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        type="button"
                        onClick={() => {
                          updateParam("page", String(validPage + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={validPage >= totalPages}
                        className="flex h-9 items-center justify-center rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

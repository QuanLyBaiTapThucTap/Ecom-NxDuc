import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/Services/api";
import type { Product } from "@/Pages/products/_types/product";
import ProductModal from "./_components/ProductModal";

const ITEMS_PER_PAGE = 10;

const categoryLabels: Record<string, string> = {
  computers: "Computers",
  mobiles: "Mobiles",
  televisions: "Televisions",
  audios: "Audios",
  accessories: "Accessories",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "stock_asc">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // Fetch products from API
  useEffect(() => {
    let active = true;
    setLoading(true);
    apiRequest<Product[]>("/products")
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((err) => {
        toast.error("Failed to load products: " + (err instanceof Error ? err.message : ""));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Compute metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => (p.stock ?? 0) > 5).length;
    const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5).length;
    const outOfStock = products.filter((p) => (p.stock ?? 0) <= 0).length;
    return { total, inStock, lowStock, outOfStock };
  }, [products]);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchCat = categoryFilter === "all" || p.category === categoryFilter;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);

      const stock = p.stock ?? 0;
      let matchStock = true;
      if (stockFilter === "in_stock") matchStock = stock > 5;
      else if (stockFilter === "low_stock") matchStock = stock > 0 && stock <= 5;
      else if (stockFilter === "out_of_stock") matchStock = stock <= 0;

      return matchCat && matchQuery && matchStock;
    });

    if (sortBy === "newest") {
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortBy === "price_asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "stock_asc") {
      result = [...result].sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
    }

    return result;
  }, [products, search, categoryFilter, stockFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSavedProduct = (saved: Product, isNew: boolean) => {
    if (isNew) {
      setProducts((prev) => [saved, ...prev]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct || deleteBusy) return;
    setDeleteBusy(true);
    try {
      await apiRequest(`/products/${deletingProduct.id}`, {
        method: "DELETE",
      });
      toast.success(`Product #${deletingProduct.id} deleted successfully!`);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete product.");
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & ADD BUTTON */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            Products Catalog
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Manage your store inventory, pricing, and live catalog items.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-black"
        >
          <span>＋</span>
          <span>Add New Product</span>
        </button>
      </div>

      {/* METRIC PILLS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-gray-400">Total Products</p>
          <p className="mt-1 text-2xl font-black text-gray-900">{metrics.total}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-emerald-600">In Stock</p>
          <p className="mt-1 text-2xl font-black text-emerald-700">{metrics.inStock}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-amber-600">Low Stock (≤5)</p>
          <p className="mt-1 text-2xl font-black text-amber-700">{metrics.lowStock}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase text-rose-600">Out of Stock</p>
          <p className="mt-1 text-2xl font-black text-rose-700">{metrics.outOfStock}</p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products by title, brand, category..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 pl-9 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white"
          />
          <span className="absolute left-3 top-2.5 text-sm text-gray-400">🔍</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 outline-none focus:border-black"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : categoryLabels[c] || c}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value as typeof stockFilter);
              setCurrentPage(1);
            }}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 outline-none focus:border-black"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock (&gt;5)</option>
            <option value="low_stock">Low Stock (≤5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as typeof sortBy);
              setCurrentPage(1);
            }}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 outline-none focus:border-black"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="stock_asc">Stock: Low to High</option>
          </select>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-500 animate-pulse">
            Loading products catalog from server...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl">📦</p>
            <h3 className="mt-3 text-base font-bold text-gray-900">No products found</h3>
            <p className="mt-1 text-xs text-gray-500">
              Try searching with another keyword or resetting the filter options.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStockFilter("all");
              }}
              className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3.5">Product</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Stock</th>
                  <th className="px-6 py-3.5">Rating</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedProducts.map((p) => {
                  const stock = p.stock ?? 0;
                  const stockBadge =
                    stock <= 0
                      ? { label: "Out of stock", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" }
                      : stock <= 5
                      ? { label: `Low (${stock})`, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" }
                      : { label: `In stock (${stock})`, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };

                  return (
                    <tr key={p.id} className="transition hover:bg-gray-50/70">
                      {/* Product details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-12 w-12 rounded-xl border border-gray-100 bg-gray-50 p-1 object-contain shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&h=800&q=85&sig=1-1";
                            }}
                          />
                          <div className="min-w-0 max-w-xs">
                            <p className="truncate font-bold text-gray-900">{p.title}</p>
                            <p className="text-[11px] text-gray-400">
                              {p.brand || "TechStore"} • #{p.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 capitalize">
                          {categoryLabels[p.category] || p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        <div>
                          <span>${p.price.toFixed(2)}</span>
                          {p.oldPrice && (
                            <span className="ml-1.5 text-[11px] text-gray-400 line-through">
                              ${p.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${stockBadge.bg} ${stockBadge.text} ${stockBadge.border}`}
                        >
                          {stockBadge.label}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500">★</span>
                          <span className="font-bold">{p.rating?.rate || 0}</span>
                          <span className="text-[10px] text-gray-400">({p.rating?.count || 0})</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(p);
                              setModalOpen(true);
                            }}
                            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 transition hover:border-black hover:text-black"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Showing page <span className="font-bold text-gray-900">{currentPage}</span> of{" "}
              <span className="font-bold text-gray-900">{totalPages}</span> ({filteredProducts.length} items)
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                        currentPage === page
                          ? "bg-gray-900 text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPages)
                ) {
                  return <span key={page} className="px-1 text-gray-400">...</span>;
                }
                return null;
              })}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL (ADD / EDIT) */}
      <ProductModal
        isOpen={modalOpen}
        product={editingProduct}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSaved={handleSavedProduct}
      />

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600">
              🗑️
            </div>
            <h3 className="mt-4 text-base font-bold text-gray-900">
              Delete Product #{deletingProduct.id}?
            </h3>
            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-gray-800">"{deletingProduct.title}"</span>? This will permanently remove it from <span className="font-mono text-gray-800">products.json</span>.
            </p>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                disabled={deleteBusy}
                onClick={() => setDeletingProduct(null)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteBusy}
                onClick={handleDeleteConfirm}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {deleteBusy ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

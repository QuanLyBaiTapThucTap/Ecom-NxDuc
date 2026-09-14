import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/Services/api";
import type { Product } from "@/Pages/products/_types/product";

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSaved: (savedProduct: Product, isNew: boolean) => void;
}

const CATEGORIES = [
  { id: "computers", label: "Computers & Laptops" },
  { id: "mobiles", label: "Mobile Phones & Tablets" },
  { id: "televisions", label: "Televisions & Displays" },
  { id: "audios", label: "Audio & Headphones" },
  { id: "accessories", label: "Tech Accessories" },
];

export default function ProductModal({
  isOpen,
  product,
  onClose,
  onSaved,
}: ProductModalProps) {
  const isEditing = Boolean(product);

  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    category: "computers",
    brand: "",
    stock: "10",
    warranty: "12 months",
    image: "",
    description: "",
  });

  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        price: String(product.price ?? 0),
        oldPrice: product.oldPrice ? String(product.oldPrice) : "",
        category: product.category || "computers",
        brand: product.brand || "",
        stock: String(product.stock ?? 10),
        warranty: product.warranty || "12 months",
        image: product.image || "",
        description: product.description || "",
      });
    } else {
      setForm({
        title: "",
        price: "",
        oldPrice: "",
        category: "computers",
        brand: "",
        stock: "10",
        warranty: "12 months",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&h=800&q=85&sig=1-1",
        description: "",
      });
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) {
      errs.title = "Product title is required.";
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      errs.price = "Price must be a positive number.";
    }
    const stockNum = parseInt(form.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      errs.stock = "Stock must be a non-negative integer.";
    }
    if (!form.category) {
      errs.category = "Please select a category.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || busy) return;

    setBusy(true);

    const payload = {
      title: form.title.trim(),
      price: parseFloat(form.price),
      oldPrice: form.oldPrice.trim() ? parseFloat(form.oldPrice) : undefined,
      category: form.category,
      brand: form.brand.trim() || "TechStore",
      stock: parseInt(form.stock, 10),
      warranty: form.warranty.trim() || "12 months",
      image: form.image.trim(),
      description: form.description.trim(),
    };

    try {
      if (isEditing && product) {
        const updated = await apiRequest<Product>(`/products/${product.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Product updated successfully!");
        onSaved(updated, false);
      } else {
        const created = await apiRequest<Product>("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Product created successfully!");
        onSaved(created, true);
      }
      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save product.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEditing ? `Edit Product #${product?.id}` : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-500">
              Changes will be persisted directly to the store JSON catalog via API.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. MacBook Pro M3 14-inch"
              className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
            />
            {errors.title && (
              <p className="mt-1 text-[11px] text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Row: Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs font-medium text-gray-900 outline-none focus:border-black focus:bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Brand
              </label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="e.g. Apple, Sony, Samsung"
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          {/* Row: Price, Old Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="999.00"
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
              {errors.price && (
                <p className="mt-1 text-[11px] text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Old Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.oldPrice}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                placeholder="1199.00"
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="15"
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
              {errors.stock && (
                <p className="mt-1 text-[11px] text-red-500">{errors.stock}</p>
              )}
            </div>
          </div>

          {/* Row: Warranty & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Warranty
              </label>
              <input
                type="text"
                value={form.warranty}
                onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                placeholder="e.g. 12 months, 24 months"
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          {/* Live Image Preview */}
          {form.image && (
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 border border-gray-100">
              <img
                src={form.image}
                alt="Preview"
                className="h-14 w-14 rounded-lg object-contain bg-white border border-gray-200 p-1 shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&h=800&q=85&sig=1-1";
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800">
                  Image Preview
                </p>
                <p className="truncate text-[10px] text-gray-400">{form.image}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Product Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Detailed description of features, performance and warranty..."
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-900 outline-none focus:border-black focus:bg-white"
            />
          </div>

          {/* MODAL FOOTER */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-black transition disabled:opacity-50"
            >
              {busy ? "Saving Changes..." : isEditing ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

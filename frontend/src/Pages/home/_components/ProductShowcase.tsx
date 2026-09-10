import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "@/Pages/products/_hooks/useProducts";
import type { Product } from "@/Pages/products/_types/product";
import { useCart } from "@/Pages/cart/_hooks/useCart";
import { animateProductToCart } from "@/Pages/cart/_utils/cartAnimation";

type ShowcaseTab =
  | "best-seller"
  | "suggest-today"
  | "speakers"
  | "just-landing";

interface Tab {
  id: ShowcaseTab;
  label: string;
  icon: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "best-seller",
    label: "Best Seller",
    icon: "🔥",
    description: "Những sản phẩm được khách hàng yêu thích nhất",
  },
  {
    id: "suggest-today",
    label: "Suggest Today",
    icon: "✨",
    description: "Gợi ý công nghệ đáng mua hôm nay",
  },
  {
    id: "speakers",
    label: "Best Selling Speakers",
    icon: "🎧",
    description: "Thiết bị âm thanh bán chạy nhất",
  },
  {
    id: "just-landing",
    label: "Just Landing",
    icon: "🆕",
    description: "Những sản phẩm mới nhất vừa cập bến",
  },
];

const categoryLabels: Record<string, string> = {
  computers: "Computers",
  mobiles: "Mobiles",
  televisions: "Televisions",
  audios: "Audios",
  accessories: "Accessories",
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("best-seller");

  const { products, loading, error } = useProducts();

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const showcaseProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }

    switch (activeTab) {
      case "best-seller":
        return [...products]
          .sort((a, b) => {
            const ratingA = a.rating?.rate ?? 0;
            const ratingB = b.rating?.rate ?? 0;

            const countA = a.rating?.count ?? 0;
            const countB = b.rating?.count ?? 0;

            const scoreA = ratingA * 100 + countA;
            const scoreB = ratingB * 100 + countB;

            return scoreB - scoreA;
          })
          .slice(0, 5);

      case "suggest-today":
        return [...products]
          .sort((a, b) => {
            const ratingA = a.rating?.rate ?? 0;
            const ratingB = b.rating?.rate ?? 0;

            const scoreA = ratingA * 100 - a.price * 0.05;
            const scoreB = ratingB * 100 - b.price * 0.05;

            return scoreB - scoreA;
          })
          .slice(0, 5);

      case "speakers":
        return products
          .filter((product) => product.category === "audios")
          .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
          .slice(0, 5);

      case "just-landing":
        return [...products].sort((a, b) => b.id - a.id).slice(0, 5);

      default:
        return [];
    }
  }, [products, activeTab]);

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    const previousIndex =
      currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;

    setActiveTab(tabs[previousIndex].id);
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;

    setActiveTab(tabs[nextIndex].id);
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f7f9] py-12">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-200/20 blur-3xl" />

        <span className="absolute left-[7%] top-8 rotate-[-15deg] text-4xl opacity-20">
          ✏️
        </span>

        <span className="absolute right-[8%] top-12 rotate-[12deg] text-4xl opacity-20">
          🎒
        </span>

        <span className="absolute bottom-8 left-[12%] rotate-[8deg] text-3xl opacity-15">
          📚
        </span>

        <span className="absolute bottom-10 right-[15%] rotate-[-10deg] text-3xl opacity-15">
          ⭐
        </span>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4">
        {/* ================= HEADER ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              <span>🎒</span>
              Back To School 2026
            </div>

            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Sẵn sàng cho mùa tựu trường
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Công nghệ xịn cho một năm học thật chất. Khám phá laptop,
              smartphone, audio và nhiều thiết bị công nghệ khác.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black sm:flex"
          >
            Xem tất cả
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* ================= SHOWCASE ================= */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.07)]">
          {/* ================= CAMPAIGN HEADER ================= */}

          <div className="relative overflow-hidden bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 px-5 py-6 sm:px-7">
            <div className="absolute -right-10 -top-20 h-44 w-44 rounded-full border-[20px] border-white/5" />

            <div className="absolute -bottom-20 left-[35%] h-40 w-40 rounded-full border-[18px] border-yellow-400/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400 sm:text-xs">
                  School Season
                </p>

                <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Công nghệ cho năm học mới
                </h3>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Chọn danh mục bạn đang quan tâm
                </p>
              </div>

              <div className="hidden text-5xl sm:block">🎓</div>
            </div>
          </div>

          {/* ================= TABS ================= */}

          <div className="border-b border-gray-100 p-3 sm:p-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous category"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-black hover:bg-black hover:text-white"
              >
                ←
              </button>

              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto scrollbar-none">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeTab;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex min-w-[180px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`text-lg transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      >
                        {tab.icon}
                      </span>

                      <span>{tab.label}</span>

                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 translate-y-1/2 rounded-full bg-yellow-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next category"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-black hover:bg-black hover:text-white"
              >
                →
              </button>
            </div>
          </div>

          {/* ================= ACTIVE TITLE ================= */}

          <div className="flex items-center justify-between px-5 pt-6 sm:px-7">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeTabData?.icon}</span>

                <h3 className="text-xl font-black text-gray-900">
                  {activeTabData?.label}
                </h3>
              </div>

              <p className="mt-1 text-sm text-gray-400">
                {activeTabData?.description}
              </p>
            </div>

            <span className="hidden text-xs font-medium text-gray-400 sm:block">
              {showcaseProducts.length} sản phẩm
            </span>
          </div>

          {/* ================= PRODUCT AREA ================= */}

          <div
            key={activeTab}
            className="animate-[showcaseIn_0.35s_ease-out] px-4 pb-4 pt-5 sm:px-6"
          >
            {loading && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl bg-white"
                  >
                    <div className="h-[210px] animate-pulse rounded-xl bg-gray-100" />

                    <div className="space-y-3 p-3">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                      <div className="h-5 w-1/2 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl">😢</div>

                  <p className="mt-3 font-semibold text-gray-900">
                    Không thể tải sản phẩm
                  </p>

                  <p className="mt-1 text-sm text-gray-400">{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && showcaseProducts.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl">📦</div>

                  <p className="mt-3 font-semibold text-gray-900">
                    Chưa có sản phẩm
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Danh mục này hiện chưa có sản phẩm.
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && showcaseProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {showcaseProducts.map((product) => (
                  <ShowcaseProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* ================= BOTTOM ================= */}

          <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-4 py-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "w-8 bg-gray-900"
                    : "w-2 bg-gray-200 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes showcaseIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .scrollbar-none {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

/* ============================================================
   PRODUCT CARD
============================================================ */

interface ShowcaseProductCardProps {
  product: Product;
}

const ShowcaseProductCard = ({ product }: ShowcaseProductCardProps) => {
  const { addToCart } = useCart();

  const productImageRef = useRef<HTMLImageElement>(null);

  const rating = product.rating?.rate ?? 0;
  const ratingCount = product.rating?.count ?? 0;

  const oldPrice = product.price * 1.2;

  const sold = Math.min(Math.max(Math.round(ratingCount / 5), 12), 99);

  const category = categoryLabels[product.category] ?? product.category;

  const roundedRating = Math.round(rating);

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {
    addToCart(product);

    animateProductToCart(product.image, productImageRef.current);
  };

  return (
    <article className="group min-w-0 overflow-hidden rounded-xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      {/* ================= IMAGE ================= */}

      <Link to={`/products/${product.id}`} className="block">
        <div className="relative flex h-[190px] items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f7] sm:h-[210px]">
          <img
            ref={productImageRef}
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
            Sale
          </span>
        </div>
      </Link>

      {/* ================= INFO ================= */}

      <div className="px-2 pb-3 pt-3">
        {/* Category */}

        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {category}
        </p>

        {/* Product name */}

        <Link to={`/products/${product.id}`} className="block">
          <h4 className="mt-1 min-h-[40px] line-clamp-2 text-sm font-semibold leading-5 text-gray-900 transition hover:text-gray-500">
            {product.title}
          </h4>
        </Link>

        {/* Rating */}

        <div className="mt-2 flex items-center gap-1">
          <span className="text-xs tracking-tight text-yellow-500">
            {"★".repeat(roundedRating)}
            {"☆".repeat(5 - roundedRating)}
          </span>

          <span className="text-xs font-medium text-gray-600">
            {rating.toFixed(1)}
          </span>

          <span className="text-[11px] text-gray-400">({ratingCount})</span>
        </div>

        {/* Price */}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-lg font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ${oldPrice.toFixed(2)}
          </span>
        </div>

        {/* Sold progress */}

        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-700"
              style={{
                width: `${sold}%`,
              }}
            />
          </div>

          <p className="mt-1 text-[10px] text-gray-400">
            Đã bán {sold} sản phẩm
          </p>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="mt-3 grid grid-cols-2 gap-2">
          {/* ADD TO CART */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-9 items-center justify-center rounded-lg border border-gray-900 bg-white px-2 text-[10px] font-bold text-gray-900 transition hover:bg-gray-100 active:scale-95 sm:text-[11px]"
          >
            🛒 Thêm vào giỏ
          </button>

          {/* BUY NOW */}

          <Link
            to={`/products/${product.id}`}
            className="flex h-9 items-center justify-center rounded-lg bg-gray-900 px-2 text-[10px] font-bold text-white transition hover:bg-black active:scale-95 sm:text-[11px]"
          >
            Mua ngay
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductShowcase;

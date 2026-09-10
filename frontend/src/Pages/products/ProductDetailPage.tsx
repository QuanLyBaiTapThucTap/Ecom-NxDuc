import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { analyticsService } from "@/Services/analyticsService";

import { useProducts } from "./_hooks/useProducts";
import { useProductDetail } from "./_hooks/useProductDetail";

import ProductGallery from "./_components/ProductGallery";
import ProductDetailHeader from "./_components/ProductDetailHeader";
import ProductTechnicalInfo from "./_components/ProductTechnicalInfo";
import ProductDescription from "./_components/ProductDescription";
import ProductOptions from "./_components/ProductOptions";
import ProductPromotion from "./_components/ProductPromotion";
import ProductPayment from "./_components/ProductPayment";
import ProductGifts from "./_components/ProductGifts";
import ProductActions from "./_components/ProductActions";
import RelatedProducts from "./_components/RelatedProducts";
import ProductReviews from "./_components/ProductReviews";

import type { PaymentMethod } from "./_types/payment";

const ProductDetailPage = () => {
  const { product, loading, error } = useProductDetail();
  useEffect(() => {
    if (!product) {
      return;
    }

    analyticsService.track("PRODUCT_VIEW", {
      productId: product.id,
    });
  }, [product]);

  const { products } = useProducts();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cod");
  const [quantity, setQuantity] = useState(1);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="min-h-[600px] bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
          <div className="animate-pulse">
            {/* Breadcrumb */}
            <div className="h-3 w-64 rounded bg-gray-200" />

            {/* Main layout */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left */}
              <div className="space-y-5">
                <div className="h-[420px] rounded-xl bg-gray-200" />

                <div className="h-48 rounded-xl bg-gray-200" />

                <div className="h-52 rounded-xl bg-gray-200" />
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div className="h-48 rounded-xl bg-gray-200" />
                <div className="h-36 rounded-xl bg-gray-200" />
                <div className="h-40 rounded-xl bg-gray-200" />
                <div className="h-52 rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#f7f7f7] px-4">
        <div className="text-center">
          <div className="text-4xl">⚠️</div>

          <h1 className="mt-3 text-lg font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-1 text-xs text-gray-500">{error}</p>

          <Link
            to="/products"
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-gray-900 px-5 text-xs font-semibold text-white transition hover:bg-black"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /* ============================================================
     PRODUCT NOT FOUND
  ============================================================ */

  if (!product) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-[#f7f7f7] px-4">
        <div className="text-center">
          <div className="text-5xl">🔍</div>

          <h1 className="mt-4 text-lg font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            The product you're looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-gray-900 px-5 text-xs font-semibold text-white transition hover:bg-black"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /* ============================================================
     MAIN
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
        {/* ======================================================
            BREADCRUMB
        ====================================================== */}

        <div className="mb-5 flex items-center gap-2 overflow-hidden text-[11px]">
          <Link
            to="/"
            className="shrink-0 text-gray-400 transition hover:text-gray-900"
          >
            Home
          </Link>

          <span className="shrink-0 text-gray-300">/</span>

          <Link
            to="/products"
            className="shrink-0 text-gray-400 transition hover:text-gray-900"
          >
            Products
          </Link>

          <span className="shrink-0 text-gray-300">/</span>

          <span className="truncate font-medium text-gray-700">
            {product.title}
          </span>
        </div>

        {/* ======================================================
            PRODUCT DETAIL
        ====================================================== */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* ====================================================
              LEFT COLUMN
          ==================================================== */}

          <div className="min-w-0 space-y-5">
            {/* Product images */}
            <ProductGallery product={product} />

            {/* Product information */}
            <div className="rounded-xl border border-gray-200 bg-white px-5">
              <ProductDetailHeader product={product} />

              <ProductTechnicalInfo product={product} />

              <ProductDescription product={product} />
            </div>
          </div>

          {/* ====================================================
              RIGHT COLUMN
          ==================================================== */}

          <div className="min-w-0 space-y-4">
            {/* Product options */}
            <ProductOptions
              product={product}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              selectedRam={selectedRam}
              selectedVersion={selectedVersion}
              onColorChange={setSelectedColor}
              onStorageChange={setSelectedStorage}
              onRamChange={setSelectedRam}
              onVersionChange={setSelectedVersion}
            />

            {/* Promotions */}
            <ProductPromotion product={product} />

            {/* Payment */}
            <ProductPayment
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />

            {/* Gifts */}
            <ProductGifts product={product} />

            {/* Actions */}
            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>

        {/* ======================================================
            RELATED PRODUCTS
        ====================================================== */}

        <section className="mt-6 rounded-xl border border-gray-200 bg-white px-5">
          <RelatedProducts products={products} currentProduct={product} />
        </section>

        {/* ======================================================
            REVIEWS
        ====================================================== */}

        <section className="mt-6 rounded-xl border border-gray-200 bg-white px-5">
          <ProductReviews product={product} />
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;

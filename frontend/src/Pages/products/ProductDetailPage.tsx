import { useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "./_hooks/useProducts";
import { useProductDetail } from "./_hooks/useProductDetail";

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
  const { products } = useProducts();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cod");

  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-[500px] bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-10">
          <div className="animate-pulse">
            <div className="h-5 w-64 rounded bg-gray-200" />

            <div className="mt-2 h-3 w-96 rounded bg-gray-200" />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded bg-gray-200" />
                <div className="h-24 rounded bg-gray-200" />
                <div className="h-52 rounded bg-gray-200" />
              </div>

              <div className="space-y-4">
                <div className="h-48 rounded-xl bg-gray-200" />
                <div className="h-40 rounded-xl bg-gray-200" />
                <div className="h-48 rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1200px] items-center justify-center px-4">
          <div className="text-center">
            <div className="text-4xl">⚠️</div>

            <h1 className="mt-3 text-lg font-bold text-gray-900">
              Something went wrong
            </h1>

            <p className="mt-1 text-xs text-gray-500">{error}</p>

            <Link
              to="/products"
              className="mt-5 inline-flex h-9 items-center rounded-lg bg-gray-900 px-4 text-xs font-semibold text-white transition hover:bg-black"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[500px] bg-[#f7f7f7]">
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1200px] items-center justify-center px-4">
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
              className="mt-5 inline-flex h-9 items-center rounded-lg bg-gray-900 px-4 text-xs font-semibold text-white transition hover:bg-black"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-[11px]">
          <Link to="/" className="text-gray-400 transition hover:text-gray-900">
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <Link
            to="/products"
            className="text-gray-400 transition hover:text-gray-900"
          >
            Products
          </Link>

          <span className="text-gray-300">/</span>

          <span className="truncate font-medium text-gray-700">
            {product.title}
          </span>
        </div>

        {/* ================================================== */}
        {/* PRODUCT DETAIL */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* ================================================== */}
          {/* LEFT - PRODUCT INFORMATION */}
          {/* ================================================== */}

          <div className="min-w-0 space-y-0 rounded-xl border border-gray-200 bg-white px-5">
            <ProductDetailHeader product={product} />

            <ProductTechnicalInfo product={product} />

            <ProductDescription product={product} />
          </div>

          {/* ================================================== */}
          {/* RIGHT - PURCHASE AREA */}
          {/* ================================================== */}

          <div className="min-w-0 space-y-4">
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

            <ProductPromotion product={product} />

            <ProductPayment
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />

            <ProductGifts product={product} />

            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>

        {/* ================================================== */}
        {/* RELATED PRODUCTS */}
        {/* ================================================== */}

        <div className="mt-6 rounded-xl border border-gray-200 bg-white px-5">
          <RelatedProducts products={products} currentProduct={product} />
        </div>

        {/* ================================================== */}
        {/* REVIEWS */}
        {/* ================================================== */}

        <div className="mt-6 rounded-xl border border-gray-200 bg-white px-5">
          <ProductReviews product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

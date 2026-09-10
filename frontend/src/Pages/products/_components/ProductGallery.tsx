import { useState } from "react";

import type { Product } from "../_types/product";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      {/* Main image */}
      <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-lg bg-white">
        <img
          src={selectedImage}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform duration-300 hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = product.image;
          }}
        />

        {/* Discount badge */}
        {product.oldPrice && product.oldPrice > product.price && (
          <span className="absolute left-4 top-4 rounded-md bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            SALE
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const active = selectedImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-white p-1.5 transition ${
                  active
                    ? "border-gray-900"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  className="h-full w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.src = product.image;
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Product information below gallery */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
          <p className="text-[10px] text-gray-400">Brand</p>
          <p className="mt-0.5 truncate text-xs font-semibold text-gray-800">
            {product.brand ?? "N/A"}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
          <p className="text-[10px] text-gray-400">Category</p>
          <p className="mt-0.5 truncate text-xs font-semibold capitalize text-gray-800">
            {product.category}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
          <p className="text-[10px] text-gray-400">Warranty</p>
          <p className="mt-0.5 truncate text-xs font-semibold text-gray-800">
            {product.warranty ?? "12 months"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

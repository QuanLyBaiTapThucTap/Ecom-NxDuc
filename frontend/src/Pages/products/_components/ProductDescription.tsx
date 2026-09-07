import { useState } from "react";

import type { Product } from "../_types/product";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const description = product.description || "No description available.";

  const shouldCollapse = description.length > 500;

  const displayedDescription =
    expanded || !shouldCollapse
      ? description
      : `${description.slice(0, 500)}...`;

  return (
    <section className="border-b border-gray-200 py-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">Product Description</h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Learn more about this product
        </p>
      </div>

      <div className="text-xs leading-6 text-gray-600">
        <p>{displayedDescription}</p>

        {shouldCollapse && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-xs font-semibold text-gray-900 underline underline-offset-2 transition hover:text-gray-500"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductDescription;

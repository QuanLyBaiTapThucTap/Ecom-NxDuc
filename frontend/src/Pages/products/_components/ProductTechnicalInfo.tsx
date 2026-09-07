import type { Product } from "../_types/product";

interface ProductTechnicalInfoProps {
  product: Product;
}

const ProductTechnicalInfo = ({ product }: ProductTechnicalInfoProps) => {
  const specifications = product.specifications ?? [];

  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-200 py-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">
          Technical Specifications
        </h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Detailed product specifications
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        {specifications.map((specification, index) => (
          <div
            key={`${specification.label}-${index}`}
            className={`grid grid-cols-[140px_minmax(0,1fr)] text-xs ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="border-r border-gray-200 px-3 py-2.5 font-medium text-gray-600">
              {specification.label}
            </div>

            <div className="px-3 py-2.5 text-gray-900">
              {specification.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductTechnicalInfo;

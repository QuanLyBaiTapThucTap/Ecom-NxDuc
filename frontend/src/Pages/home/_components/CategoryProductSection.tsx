import { useNavigate } from "react-router-dom";
import type { Product } from "@/Pages/products/_types/product";
import ProductCard from "../../products/_components/ProductCard";

interface CategoryProductSectionProps {
  title: string;
  sideImage: string;
  products: Product[];
  categories?: string[];
}

const CategoryProductSection = ({
  title,
  sideImage,
  products,
  categories = [],
}: CategoryProductSectionProps) => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px] px-4">
      {/* TITLE */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold uppercase text-gray-900">{title}</h2>

        <button
          type="button"
          onClick={() => navigate(products[0] ? `/products?category=${encodeURIComponent(products[0].category)}` : "/products")}
          className="text-sm font-medium text-gray-500 transition hover:text-red-500"
        >
          Xem tất cả →
        </button>
      </div>

      {/* MAIN SECTION */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid grid-cols-[220px_minmax(0,1fr)]">
          {/* SIDE IMAGE */}
          <div className="relative min-h-[620px] overflow-hidden">
            <img
              src={sideImage}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="min-w-0">
            {/* CATEGORY */}
            {categories.length > 0 && (
              <div className="flex min-h-[86px] flex-wrap items-center gap-x-8 gap-y-3 border-b border-gray-100 px-6 py-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => navigate(`/products?q=${encodeURIComponent(category)}`)}
                    type="button"
                    className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-red-500"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* PRODUCTS */}
            <div className="grid grid-cols-4 gap-4 p-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductSection;

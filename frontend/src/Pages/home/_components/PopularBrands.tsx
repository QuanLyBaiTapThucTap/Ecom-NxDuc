const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Xiaomi",
  "Microsoft",
  "Philips",
  "JBL",
];

const PopularBrands = () => {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Popular Brands
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Shop from the brands you love
            </p>
          </div>

          <button
            type="button"
            className="hidden text-sm font-medium text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
          >
            View All
          </button>
        </div>

        {/* Brands */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              className="group flex h-[100px] items-center justify-center rounded-lg border border-gray-200 bg-white px-4 transition duration-200 hover:border-black hover:shadow-sm"
            >
              <span className="text-lg font-semibold tracking-tight text-gray-500 transition group-hover:text-black">
                {brand}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-5 text-center sm:hidden">
          <button
            type="button"
            className="text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;

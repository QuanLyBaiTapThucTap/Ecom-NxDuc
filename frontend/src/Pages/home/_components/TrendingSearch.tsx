const trendingItems = [
  "Vacuum Robot",
  "Bluetooth Speaker",
  "OLED TV",
  "Security Camera",
  "Macbook M1",
  "Smart Washing Machine",
  "iPad Mini 2023",
  "PS5",
  "Earbuds",
  "Air Condition Inverter",
  "Flycam",
  "Electric Bike",
  "Gaming Computer",
  "Smart Air Purifier",
  "Apple Watch",
];

const TrendingSearch = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Trending Search</h2>

          <p className="mt-1 text-sm text-gray-500">
            Popular searches you may like
          </p>
        </div>

        {/* Trending keywords */}
        <div className="flex flex-wrap gap-3">
          {trendingItems.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSearch;

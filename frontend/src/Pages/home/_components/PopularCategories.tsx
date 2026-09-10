import { useNavigate } from "react-router-dom";
const categories = [
  {
    name: "Gaming",
    icon: "🎮",
  },
  {
    name: "Sport Equip",
    icon: "⚽",
  },
  {
    name: "Kitchen",
    icon: "🍳",
  },
  {
    name: "Robot Cleaner",
    icon: "🤖",
  },
  {
    name: "Mobiles",
    icon: "📱",
  },
  {
    name: "Office",
    icon: "💼",
  },
  {
    name: "Cameras",
    icon: "📷",
  },
  {
    name: "Computers",
    icon: "💻",
  },
  {
    name: "Televisions",
    icon: "📺",
  },
  {
    name: "Audios",
    icon: "🎧",
  },
];

const PopularCategories = () => {
  const navigate = useNavigate();
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Popular Categories</h2>

        <div className="grid grid-cols-5 gap-4 lg:grid-cols-10">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(`/products?${["mobiles", "computers", "televisions", "audios"].includes(category.name.toLowerCase()) ? "category" : "q"}=${encodeURIComponent(category.name.toLowerCase())}`)}
              type="button"
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border bg-white p-4 transition hover:border-black hover:shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl transition group-hover:bg-black">
                <span className="transition group-hover:grayscale">
                  {category.icon}
                </span>
              </div>

              <span className="text-center text-sm font-medium">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;

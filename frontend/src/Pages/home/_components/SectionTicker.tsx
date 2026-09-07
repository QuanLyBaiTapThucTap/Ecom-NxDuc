import { useEffect, useState } from "react";

const sections = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "best-deals",
    label: "Best Weekly Deals",
  },
  {
    id: "trending",
    label: "Trending Search",
  },
  {
    id: "pre-order",
    label: "Pre-order",
  },
  {
    id: "best-seller",
    label: "Best Seller",
  },
  {
    id: "brands",
    label: "Popular Brands",
  },
  {
    id: "suggest",
    label: "Suggest Today",
  },
  {
    id: "speakers",
    label: "Best Selling Speakers",
  },
  {
    id: "landing",
    label: "Just Landing",
  },
];

const SectionTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % sections.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id: string, index: number) => {
    setActiveIndex(index);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="sticky top-0 z-40 border-y border-gray-200 bg-white">
      <div className="mx-auto flex h-11 max-w-[1200px] items-center px-4">
        <div className="flex w-full items-center justify-center overflow-hidden">
          <div className="flex items-center gap-8">
            {sections.map((section, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleClick(section.id, index)}
                  className={`whitespace-nowrap text-sm transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTicker;

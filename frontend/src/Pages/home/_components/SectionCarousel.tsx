import { useEffect, useState } from "react";

import banner1 from "@/assets/image/banners/banner1.webp";
import banner2 from "@/assets/image/banners/banner2.webp";
import banner3 from "@/assets/image/banners/banner3.webp";
import banner4 from "@/assets/image/banners/banner4.webp";
import banner5 from "@/assets/image/banners/banner5.webp";
import banner6 from "@/assets/image/banners/banner6.webp";
import banner7 from "@/assets/image/banners/banner7.webp";
import banner8 from "@/assets/image/banners/banner8.webp";
import banner9 from "@/assets/image/banners/banner9.webp";
import banner10 from "@/assets/image/banners/banner10.webp";

interface SectionItem {
  id: string;
  label: string;
  image: string;
  description: string;
}

const sections: SectionItem[] = [
  {
    id: "banner1",
    label: "GALAXY Z8 SERIES",
    image: banner1,
    description: "Mở bán tặng quà khủng",
  },
  {
    id: "banner2",
    label: "IPHONE 17 PRO MAX",
    image: banner2,
    description: "Trả góp nhẹ tay, cực đã tay",
  },
  {
    id: "banner3",
    label: "REDMI NOTE 17 SERIES",
    image: banner3,
    description: "Ưu đãi mở bán",
  },
  {
    id: "banner4",
    label: "NĂNG ĐỘNG CÙNG ASUS",
    image: banner4,
    description: "Ưu đãi mùa tựu trường",
  },
  {
    id: "banner5",
    label: "XIAOMI MIBRAND 11 ACTIVE",
    image: banner5,
    description: "Giá rẻ mà siêu khỏe",
  },
  {
    id: "banner6",
    label: "TỰU TRƯỜNG CÙNG LENOVO",
    image: banner6,
    description: "Lap xịn quà slay",
  },
  {
    id: "banner7",
    label: "XIAOMI POCO F9 ULTRA",
    image: banner7,
    description: "Đột phá công nghệ",
  },
  {
    id: "banner8",
    label: "SAMSUNG GALAXY S26 FE",
    image: banner8,
    description: "Mua ngay giá sốc",
  },
  {
    id: "banner9",
    label: "SONY WH-1000XM6",
    image: banner9,
    description: "Mua càng nhiều, quà càng căng",
  },
  {
    id: "banner10",
    label: "ROBOT HÚT BỤI XIAOMI",
    image: banner10,
    description: "Hút sạch ví tiền của bạn",
  },
];

const SectionCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSection = sections[activeIndex];

  const previousIndex = (activeIndex - 1 + sections.length) % sections.length;

  const nextIndex = (activeIndex + 1) % sections.length;

  const previousSection = sections[previousIndex];
  const nextSection = sections[nextIndex];

  // Tự động chuyển banner
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % sections.length;
      });
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // Chuyển banner
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Scroll tới section tương ứng
  const handleActiveClick = () => {
    const target = document.getElementById(activeSection.id);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-4">
        {/* =====================================
            TOP CAROUSEL NAVIGATION
        ====================================== */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex h-[82px] items-center">
            {/* ================= LEFT ================= */}
            <button
              type="button"
              onClick={() => goToSlide(previousIndex)}
              className="flex h-full w-1/4 items-center justify-end px-4 transition hover:bg-gray-50"
            >
              <div className="flex max-w-full items-center gap-2 text-gray-400">
                <span className="text-lg">←</span>

                <span className="hidden truncate text-sm md:block">
                  {previousSection.label}
                </span>
              </div>
            </button>

            {/* ================= CENTER ================= */}
            <button
              type="button"
              onClick={handleActiveClick}
              className="flex h-full w-1/2 items-center justify-center"
            >
              <div
                key={activeSection.id}
                className="flex flex-col items-center"
              >
                {/* TITLE */}
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />

                  <span className="text-sm font-bold tracking-wide text-gray-900 sm:text-base">
                    {activeSection.label}
                  </span>

                  <span className="text-sm text-gray-400">→</span>
                </div>

                {/* DESCRIPTION */}
                <span className="mt-1 text-xs text-gray-400 sm:text-sm">
                  {activeSection.description}
                </span>
              </div>
            </button>

            {/* ================= RIGHT ================= */}
            <button
              type="button"
              onClick={() => goToSlide(nextIndex)}
              className="flex h-full w-1/4 items-center justify-start px-4 transition hover:bg-gray-50"
            >
              <div className="flex max-w-full items-center gap-2 text-gray-400">
                <span className="hidden truncate text-sm md:block">
                  {nextSection.label}
                </span>

                <span className="text-lg">→</span>
              </div>
            </button>
          </div>

          {/* Progress */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100">
            <div
              key={activeSection.id}
              className="h-full bg-black"
              style={{
                animation: "carouselProgress 4.5s linear",
              }}
            />
          </div>
        </div>

        {/* =====================================
            ACTIVE IMAGE
        ====================================== */}
        <div className="relative mt-3 flex w-full justify-center overflow-hidden">
          <div className="relative w-full overflow-hidden rounded-xl">
            <img
              key={activeSection.id}
              src={activeSection.image}
              alt={activeSection.label}
              className="block h-auto w-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`Go to ${section.label}`}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes carouselProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default SectionCarousel;

import heroTv from "@/assets/image/banners/hero-tv.jpg";
import heroFan from "@/assets/image/banners/hero-fan.jpg";
import heroIpad from "@/assets/image/banners/hero-ipad.jpg";

const HeroBanner = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* ==================== BANNER TV ==================== */}
          <div className="relative col-span-12 min-h-[360px] overflow-hidden rounded-lg lg:col-span-8">
            <img
              src={heroTv}
              alt='EKO 40" Android TV'
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Nội dung */}
            <div className="relative z-10 flex h-full items-center p-8 md:p-12">
              <div className="max-w-[380px] text-white">
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-white">
                  EKO
                </p>

                <h1 className="text-4xl font-bold leading-tight text-white">
                  40" Android TV
                </h1>

                <p className="mt-4 text-sm text-white">
                  Smart Full HD Android TV
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* ==================== BANNER BÊN PHẢI ==================== */}
          <div className="col-span-12 grid gap-4 lg:col-span-4">
            {/* ==================== BANNER QUẠT ==================== */}
            <div className="relative min-h-[172px] overflow-hidden rounded-lg">
              <img
                src={heroFan}
                alt="Humidifying Fan"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Nội dung */}
              <div className="relative z-10 flex h-full items-center p-6">
                <div className="max-w-[220px] text-white">
                  <p className="text-xs font-medium uppercase tracking-wide text-white">
                    Smart Home
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Humidifying Fan
                  </h2>

                  <button
                    type="button"
                    className="mt-4 text-sm font-semibold text-white underline underline-offset-4"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* ==================== BANNER IPAD ==================== */}
            <div className="relative min-h-[172px] overflow-hidden rounded-lg">
              <img
                src={heroIpad}
                alt="iPad mini"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Nội dung */}
              <div className="relative z-10 flex h-full items-center p-6">
                <div className="max-w-[220px] text-white">
                  <p className="text-xs font-medium uppercase tracking-wide text-white">
                    New Arrival
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    iPad mini
                  </h2>

                  <button
                    type="button"
                    className="mt-4 text-sm font-semibold text-white underline underline-offset-4"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

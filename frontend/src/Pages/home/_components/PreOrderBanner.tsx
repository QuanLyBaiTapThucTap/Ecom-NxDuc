import oppoBanner from "@/assets/image/banners/oppowatch.jpg";
const PreOrderBanner = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="relative min-h-[280px] overflow-hidden rounded-xl">
          {/* Background image */}
          <img
            src={oppoBanner}
            alt="OPPO Watch Sport Series 8"
            className="absolute inset-0 h-full w-full object-cover object-[center_27%]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[280px] items-center px-8 py-10 md:px-14">
            <div className="max-w-[450px] text-white">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
                Pre-order now
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
                OPPO Watch
              </h2>

              <p className="mt-1 text-2xl font-semibold text-white">
                Sport Series 8
              </p>

              <p className="mt-4 max-w-[380px] text-sm leading-6 text-white/90">
                Experience a smarter and healthier lifestyle with the latest
                OPPO Watch.
              </p>

              <button
                type="button"
                className="mt-6 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Pre-order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOrderBanner;

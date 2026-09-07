const ContactMap = () => {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Hanoi%2C%20Vietnam";

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Find Us</h2>

          <p className="mt-1 text-[10px] text-gray-400">
            Visit our store in Hanoi
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] font-semibold text-gray-500">
          Google Maps
        </span>
      </div>

      {/* MAP */}
      <div className="relative h-[220px] overflow-hidden bg-gray-100">
        <iframe
          title="Our location on Google Maps"
          src="https://www.google.com/maps?q=Hanoi%2C%20Vietnam&output=embed"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* MAP OVERLAY */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <p className="text-[11px] font-semibold text-gray-900">
            Hanoi, Vietnam
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400">
            123 Nguyen Trai Street
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] font-semibold text-gray-700 transition hover:text-black"
        >
          Find us on Google Maps
          <span>↗</span>
        </a>
      </div>
    </section>
  );
};

export default ContactMap;

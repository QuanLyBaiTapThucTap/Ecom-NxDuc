const ContactInfo = () => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900">Get In Touch</h2>

        <p className="mt-1 text-[11px] leading-4 text-gray-400">
          Feel free to contact us through any of the channels below.
        </p>
      </div>

      {/* INFORMATION */}
      <div className="px-5">
        {/* ADDRESS */}
        <div className="flex items-start gap-3 border-b border-gray-100 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
            📍
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Address
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-gray-900">
              123 Nguyen Trai Street
              <br />
              Thanh Xuan, Hanoi, Vietnam
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex items-start gap-3 border-b border-gray-100 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
            ✉
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Email
            </p>

            <a
              href="mailto:support@nxduc.com"
              className="mt-1 block text-xs font-medium text-gray-900 transition hover:text-gray-500"
            >
              support@nxduc.com
            </a>

            <p className="mt-0.5 text-[10px] leading-4 text-gray-400">
              We usually reply within 24 hours.
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-start gap-3 border-b border-gray-100 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
            ☎
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Phone
            </p>

            <a
              href="tel:+84912345678"
              className="mt-1 block text-xs font-medium text-gray-900 transition hover:text-gray-500"
            >
              +84 912 345 678
            </a>

            <p className="mt-0.5 text-[10px] leading-4 text-gray-400">
              Mon - Sat, 08:00 - 18:00
            </p>
          </div>
        </div>

        {/* OPENING HOURS */}
        <div className="flex items-start gap-3 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm">
            🕐
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Opening Hours
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-gray-900">
              Monday - Saturday
            </p>

            <p className="mt-0.5 text-[10px] leading-4 text-gray-400">
              08:00 AM - 06:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;

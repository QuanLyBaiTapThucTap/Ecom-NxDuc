const footerCategories = [
  "Computers",
  "Mobiles",
  "Televisions",
  "Cameras",
  "Audios",
];

const companyLinks = [
  "About Us",
  "Contact Us",
  "Careers",
  "Privacy Policy",
  "Terms & Conditions",
];

const helpLinks = [
  "Customer Service",
  "Shipping & Delivery",
  "Returns & Exchanges",
  "Order Tracking",
  "FAQs",
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">Swoo</h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Your one-stop destination for the latest electronics, smart
              devices and technology products.
            </p>

            <div className="mt-6">
              <p className="text-xs text-gray-400">Hotline 24/7</p>

              <p className="mt-1 text-lg font-semibold">(025) 3686 25 16</p>
            </div>

            <p className="mt-4 text-sm text-gray-400">Hanoi, Vietnam</p>

            <p className="mt-1 text-sm text-gray-400">support@swoo.com</p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold">Categories</h3>

            <ul className="mt-5 space-y-3">
              {footerCategories.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold">Company</h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-base font-semibold">Help</h3>

            <ul className="mt-5 space-y-3">
              {helpLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            © 2024 Swoo. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Facebook
            </button>

            <button
              type="button"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Instagram
            </button>

            <button
              type="button"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              YouTube
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

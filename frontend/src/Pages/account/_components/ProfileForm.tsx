import { useState } from "react";

const ProfileForm = () => {
  const [form, setForm] = useState({
    firstName: "Nguyen",
    lastName: "Duc",
    email: "duc@example.com",
    phone: "0912345678",
    address: "123 Nguyen Trai Street",
    city: "Hanoi",
    country: "Vietnam",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setSaved(true);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* LEFT - PROFILE */}
        <div className="border-b border-gray-100 px-6 py-7 lg:border-b-0 lg:border-r">
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-3xl font-bold text-white">
                ND
              </div>

              {/* ONLINE */}
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500" />
            </div>

            {/* NAME */}
            <h2 className="mt-4 text-base font-bold text-gray-900">
              Nguyen Duc
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">duc@example.com</p>

            <p className="mt-3 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-500">
              Customer
            </p>

            {/* CHANGE AVATAR */}
            <button
              type="button"
              className="mt-5 h-9 rounded-lg border border-gray-200 px-4 text-[11px] font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Change Avatar
            </button>
          </div>

          {/* ACCOUNT INFO */}
          <div className="mt-7 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Member since</span>

              <span className="text-[11px] font-medium text-gray-700">
                Sep 2026
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Orders</span>

              <span className="text-[11px] font-medium text-gray-700">12</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Wishlist</span>

              <span className="text-[11px] font-medium text-gray-700">
                8 items
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div>
          {/* HEADER */}
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">
              Personal Information
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">
              Update your personal information and contact details
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* FIRST NAME */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* LAST NAME */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* CITY */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                {/* COUNTRY */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-xs font-semibold text-gray-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-4">
              <div>
                {saved && (
                  <span className="text-[11px] font-medium text-green-600">
                    ✓ Changes saved successfully
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="h-10 rounded-lg bg-black px-6 text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

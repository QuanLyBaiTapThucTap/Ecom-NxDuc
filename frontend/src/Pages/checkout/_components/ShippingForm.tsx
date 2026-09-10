import type { CheckoutFormData } from "../_types/checkout";

interface ShippingFormProps {
  form: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  onChange: <K extends keyof CheckoutFormData>(
    field: K,
    value: CheckoutFormData[K],
  ) => void;
}

const ShippingForm = ({ form, errors, onChange }: ShippingFormProps) => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900">
          Shipping Information
        </h2>

        <p className="mt-1 text-[11px] text-gray-400">
          Please provide the information required for delivery.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        {/* FULL NAME */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Nguyen Van A"
            className={`h-10 w-full rounded-lg border px-3 text-xs outline-none transition placeholder:text-gray-300 ${
              errors.fullName
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
          />

          {errors.fullName && (
            <p className="mt-1 text-[10px] text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="0912 345 678"
            className={`h-10 w-full rounded-lg border px-3 text-xs outline-none transition placeholder:text-gray-300 ${
              errors.phone
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
          />

          {errors.phone && (
            <p className="mt-1 text-[10px] text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="example@email.com"
            className={`h-10 w-full rounded-lg border px-3 text-xs outline-none transition placeholder:text-gray-300 ${
              errors.email
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-[10px] text-red-500">{errors.email}</p>
          )}
        </div>

        {/* CITY */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            City / Province <span className="text-red-500">*</span>
          </label>

          <select
            value={form.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={`h-10 w-full rounded-lg border bg-white px-3 text-xs outline-none ${
              errors.city
                ? "border-red-400"
                : "border-gray-200 focus:border-black"
            }`}
          >
            <option value="">Select city</option>
            <option value="Hanoi">Hanoi</option>
            <option value="Ho Chi Minh City">Ho Chi Minh City</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Hai Phong">Hai Phong</option>
          </select>

          {errors.city && (
            <p className="mt-1 text-[10px] text-red-500">{errors.city}</p>
          )}
        </div>

        {/* DISTRICT */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            District <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={form.district}
            onChange={(e) => onChange("district", e.target.value)}
            placeholder="Thanh Xuan"
            className={`h-10 w-full rounded-lg border px-3 text-xs outline-none transition placeholder:text-gray-300 ${
              errors.district
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
          />

          {errors.district && (
            <p className="mt-1 text-[10px] text-red-500">{errors.district}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Delivery Address <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Street, building, house number..."
            className={`h-10 w-full rounded-lg border px-3 text-xs outline-none transition placeholder:text-gray-300 ${
              errors.address
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
          />

          {errors.address && (
            <p className="mt-1 text-[10px] text-red-500">{errors.address}</p>
          )}
        </div>

        {/* NOTE */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Order Note
            <span className="ml-1 font-normal text-gray-400">(Optional)</span>
          </label>

          <textarea
            value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            rows={3}
            maxLength={300}
            placeholder="Notes for delivery..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-xs outline-none transition placeholder:text-gray-300 focus:border-black"
          />
        </div>
      </div>
    </section>
  );
};

export default ShippingForm;

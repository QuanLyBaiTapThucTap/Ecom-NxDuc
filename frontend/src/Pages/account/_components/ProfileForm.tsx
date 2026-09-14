import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/Pages/auth/useAuth";
import { apiRequest, type ApiUser } from "@/Services/api";

export default function ProfileForm() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    firstname: user?.name?.firstname || "",
    lastname: user?.name?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: String(user?.address?.street || ""),
    city: String(user?.address?.city || ""),
    country: String(user?.address?.country || "Vietnam"),
  });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || busy) return;
    setBusy(true);

    try {
      const saved = await apiRequest<ApiUser>(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: {
            firstname: form.firstname.trim(),
            lastname: form.lastname.trim(),
          },
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: {
            ...user.address,
            street: form.street.trim(),
            city: form.city.trim(),
            country: form.country.trim(),
          },
        }),
      });

      setUser(saved);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to save profile.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Update your contact details and default delivery address.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstname"
            className="block text-xs font-semibold text-gray-700"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstname"
            type="text"
            required
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastname"
            className="block text-xs font-semibold text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Street Address */}
        <div className="sm:col-span-2">
          <label
            htmlFor="street"
            className="block text-xs font-semibold text-gray-700"
          >
            Street Address
          </label>
          <input
            id="street"
            type="text"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            placeholder="e.g. 128 Tran Duy Hung"
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-xs font-semibold text-gray-700"
          >
            City / Province
          </label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="e.g. Hanoi"
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-xs font-semibold text-gray-700"
          >
            Country
          </label>
          <input
            id="country"
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-gray-100 pt-5">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-black disabled:opacity-50"
        >
          {busy ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

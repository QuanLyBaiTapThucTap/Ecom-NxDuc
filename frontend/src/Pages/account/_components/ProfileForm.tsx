import { useState } from "react";
import { useAuth } from "@/Pages/auth/useAuth";
import { apiRequest, type ApiUser } from "@/Services/api";
export default function ProfileForm() {
 const { user, setUser } = useAuth();
 const [form, setForm] = useState({ firstname: user?.name.firstname || "", lastname: user?.name.lastname || "", email: user?.email || "", phone: user?.phone || "", street: String(user?.address?.street || ""), city: String(user?.address?.city || ""), country: String(user?.address?.country || "") });
 const [message, setMessage] = useState("");
 const [busy, setBusy] = useState(false);
 return <form className="space-y-5 rounded-xl border border-gray-200 bg-white p-6" onSubmit={async event => {
  event.preventDefault(); if (!user || busy) return; setBusy(true); setMessage("");
  try { const saved = await apiRequest<ApiUser>(`/users/${user.id}`, { method: "PATCH", body: JSON.stringify({ name: { firstname: form.firstname.trim(), lastname: form.lastname.trim() }, email: form.email.trim(), phone: form.phone.trim(), address: { ...user.address, street: form.street, city: form.city, country: form.country } }) }); setUser(saved); setMessage("Changes saved successfully."); }
  catch (err) { setMessage(err instanceof Error ? err.message : "Unable to save profile."); } finally { setBusy(false); }
 }}>
 <h1 className="text-xl font-bold">Personal Information</h1>
 {Object.entries(form).map(([name, value]) => <label key={name} className="block text-sm capitalize">{name}<input required={['firstname', 'email'].includes(name)} type={name === "email" ? "email" : "text"} value={value} onChange={event => { setForm({...form, [name]: event.target.value}); setMessage(""); }} className="mt-2 block w-full rounded-lg border p-3" /></label>)}
 {message && <p role="status">{message}</p>}<button disabled={busy} className="rounded-lg bg-black px-6 py-3 text-white">{busy ? "Saving..." : "Save Changes"}</button></form>;
}

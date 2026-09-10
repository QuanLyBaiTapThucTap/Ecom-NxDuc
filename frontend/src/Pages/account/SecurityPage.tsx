import { useState } from "react";
import { apiRequest } from "@/Services/api";
import { useAuth } from "@/Pages/auth/useAuth";
export default function SecurityPage() {
 const { logout } = useAuth();
 const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
 return <form className="space-y-5 rounded-xl bg-white p-6" onSubmit={async event => {
 event.preventDefault(); if (busy) return; const data = new FormData(event.currentTarget);
 if (data.get("password") !== data.get("confirm")) { setMessage("Passwords do not match."); return; }
 setBusy(true); setMessage(""); try { await apiRequest("/auth/password", {method: "POST", body: JSON.stringify({ currentPassword: data.get("current"), password: data.get("password") })}); await logout(); } catch (err) {setMessage(err instanceof Error ? err.message : "Unable to change password.");} finally {setBusy(false);}
 }}><h1 className="text-xl font-bold">Change Password</h1>
 {[["current", "Current password"], ["password", "New password"], ["confirm", "Confirm password"]].map(([name,label]) => <label key={name} className="block">{label}<input name={name} type="password" required minLength={6} autoComplete={name === "current" ? "current-password" : "new-password"} className="mt-2 block w-full rounded border p-3"/></label>)}
 <p role="alert">{message}</p><button disabled={busy} className="rounded bg-black px-5 py-3 text-white">{busy ? "Saving..." : "Update password and sign out"}</button></form>;
}

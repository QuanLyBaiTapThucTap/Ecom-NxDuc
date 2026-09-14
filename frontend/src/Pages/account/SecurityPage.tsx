import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/Services/api";
import { useAuth } from "@/Pages/auth/useAuth";

export default function SecurityPage() {
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setBusy(true);

    try {
      await apiRequest("/auth/password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
        }),
      });

      toast.success("Password updated successfully! Please sign in again.");
      await logout();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to change password.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Security & Password
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Change your password regularly to keep your account secure.
          </p>
        </div>

        <div className="mt-6 space-y-4 max-w-md">
          {/* Current Password */}
          <div>
            <label
              htmlFor="current-password"
              className="block text-xs font-semibold text-gray-700"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type={showPasswords ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new-password"
              className="block text-xs font-semibold text-gray-700"
            >
              New Password (min. 6 characters)
            </label>
            <input
              id="new-password"
              type={showPasswords ? "text" : "password"}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-xs font-semibold text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type={showPasswords ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              id="toggle-passwords"
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 accent-black cursor-pointer"
            />
            <label
              htmlFor="toggle-passwords"
              className="text-xs text-gray-600 cursor-pointer"
            >
              Show passwords
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-start border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-black disabled:opacity-50"
          >
            {busy ? "Updating Password..." : "Update Password & Sign Out"}
          </button>
        </div>
      </form>
    </div>
  );
}

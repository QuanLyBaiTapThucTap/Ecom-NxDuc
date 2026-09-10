import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../useAuth";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const validationErrors = validateForm();

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);

      toast.error("Please check your information");

      return;
    }

    try {
      setIsSubmitting(true);

      const loggedInUser = await login({
        username: email.trim(),
        password,
        remember,
      });

      toast.success("Login successful!", {
        description: "Welcome back!",
      });

      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        const from = location.state?.from;

        const redirectPath =
          typeof from === "string" &&
          from.startsWith("/") &&
          !from.startsWith("//")
            ? from
            : "/account";

        navigate(redirectPath, {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setErrors({
        general: message,
      });

      toast.error("Login failed", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (errors.email || errors.general) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
        general: undefined,
      }));
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (errors.password || errors.general) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
        general: undefined,
      }));
    }
  };

  return (
    <div className="w-full max-w-[460px]">
      {" "}
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        {/* HEADER */}{" "}
        <div className="mb-8 text-center">
          {" "}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back{" "}
          </h1>
          ```
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your account to continue
          </p>
        </div>
        {/* GENERAL ERROR */}
        {errors.general && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errors.general}
          </div>
        )}
        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email or username"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`h-12 w-full rounded-lg border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-black focus:ring-black"
              }`}
            />

            <div className="min-h-[20px]">
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <div className="flex h-5 items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-5 text-gray-900"
              >
                Password
              </label>

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="text-xs font-medium leading-5 text-gray-600 transition hover:text-black hover:underline"
              >
                Contact support
              </button>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`h-12 w-full rounded-lg border bg-white px-4 pr-[72px] text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-black"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 flex h-8 -translate-y-1/2 items-center px-2 text-xs font-medium text-gray-500 transition hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="min-h-[20px]">
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* REMEMBER */}
          <div className="flex h-5 items-center gap-2">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-black"
            />

            <label
              htmlFor="remember"
              className="cursor-pointer text-sm leading-5 text-gray-600"
            >
              Remember me
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-lg bg-black text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {/* REGISTER */}
        <div className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              navigate("/register", {
                state: location.state,
              });
            }}
            className="font-semibold text-gray-900 underline underline-offset-4 transition hover:text-gray-500"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

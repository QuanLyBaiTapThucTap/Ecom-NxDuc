import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
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

    // Reset general error
    setErrors({});

    // Validate
    const validationErrors = validateForm();

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const loginData = {
        email: email.trim(),
        password,
        remember,
      };

      console.log("Login data:", loginData);

      /*
       * Sau này gọi API ở đây:
       *
       * await authService.login({
       *   email: email.trim(),
       *   password,
       * });
       */
    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
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
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

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
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`h-12 w-full rounded-lg border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-black focus:ring-black"
              }`}
            />

            {/* EMAIL ERROR */}
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
            {/* PASSWORD LABEL + FORGOT */}
            <div className="flex h-5 items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-5 text-gray-900"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium leading-5 text-gray-600 transition hover:text-black hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* PASSWORD INPUT */}
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

            {/* PASSWORD ERROR */}
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
              window.location.href = "/register";
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

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../_services/authService";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      newErrors.name = "Please enter your full name";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!trimmedEmail) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!terms) {
      newErrors.terms = "Please accept the Terms & Conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login", { state: location.state });
    } catch (error) {
      console.error("Register error:", error);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (errors.name || errors.general) {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
        general: undefined,
      }));
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

    if (errors.password || errors.confirmPassword || errors.general) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
        confirmPassword: undefined,
        general: undefined,
      }));
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);

    if (errors.confirmPassword || errors.general) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: undefined,
        general: undefined,
      }));
    }
  };

  return (
    <div className="w-full max-w-[420px]">
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:px-6">
        <div className="mb-3 text-center">
          <h1 className="text-lg font-bold leading-6 tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
            Join us and enjoy a better shopping experience
          </p>
        </div>

        {/* GENERAL ERROR */}
        {errors.general && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
          >
            {errors.general}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-medium leading-4 text-gray-900"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-black focus:ring-black"
              }`}
            />

            <div className="min-h-[15px] pt-1">
              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-[11px] leading-4 text-red-500"
                >
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium leading-4 text-gray-900"
            >
              Email Address
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
              className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-black focus:ring-black"
              }`}
            />

            <div className="min-h-[15px] pt-1">
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-[11px] leading-4 text-red-500"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium leading-4 text-gray-900"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`h-11 w-full rounded-lg border bg-white px-3.5 pr-[68px] text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-black"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 flex h-7 -translate-y-1/2 items-center px-2 text-[11px] font-medium text-gray-500 transition hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="min-h-[15px] pt-1">
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-[11px] leading-4 text-red-500"
                >
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-medium leading-4 text-gray-900"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                className={`h-11 w-full rounded-lg border bg-white px-3.5 pr-[68px] text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-black"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 flex h-7 -translate-y-1/2 items-center px-2 text-[11px] font-medium text-gray-500 transition hover:text-black"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="min-h-[15px] pt-1">
              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className="text-[11px] leading-4 text-red-500"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* TERMS */}
          <div>
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={terms}
                onChange={(event) => {
                  setTerms(event.target.checked);

                  if (event.target.checked) {
                    setErrors((prev) => ({
                      ...prev,
                      terms: undefined,
                    }));
                  }
                }}
                className="mt-0.5 h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-black"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-4 text-gray-600"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="font-medium text-gray-900 underline underline-offset-2"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            <div className="min-h-[15px] pl-5 pt-1">
              {errors.terms && (
                <p role="alert" className="text-[11px] leading-4 text-red-500">
                  {errors.terms}
                </p>
              )}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-lg bg-black text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN */}
        <div className="mt-5 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              navigate("/login", { state: location.state });
            }}
            className="font-semibold text-gray-900 underline underline-offset-2 transition hover:text-gray-500"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

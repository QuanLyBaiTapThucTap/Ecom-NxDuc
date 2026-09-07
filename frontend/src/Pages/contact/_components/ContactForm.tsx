import { useState } from "react";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialForm: ContactFormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);

    if (errors[name as keyof FormErrors]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Fake API request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Contact form submitted:", form);

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-sm font-bold text-gray-900">Send Us a Message</h2>

        <p className="mt-1 text-[11px] leading-4 text-gray-400">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5 px-6 py-6">
          {/* SUCCESS */}
          {submitted && (
            <div className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                ✓
              </div>

              <div>
                <p className="text-xs font-semibold text-green-700">
                  Message sent successfully
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-green-600">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Full Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`h-10 w-full rounded-lg border bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                  errors.fullName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              {errors.fullName && (
                <p className="mt-1.5 text-[10px] text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                Email Address
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`h-10 w-full rounded-lg border bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-[10px] text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-xs font-semibold text-gray-700"
            >
              Subject
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help you?"
              className={`h-10 w-full rounded-lg border bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.subject
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-gray-900 focus:ring-gray-900"
              }`}
            />

            {errors.subject && (
              <p className="mt-1.5 text-[10px] text-red-500">
                {errors.subject}
              </p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-gray-700"
              >
                Message
                <span className="ml-1 text-red-500">*</span>
              </label>

              <span className="text-[10px] text-gray-400">
                {form.message.length}/1000
              </span>
            </div>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={(event) => {
                if (event.target.value.length <= 1000) {
                  handleChange(event);
                }
              }}
              rows={7}
              placeholder="Tell us how we can help..."
              className={`w-full resize-none rounded-lg border bg-white px-3 py-3 text-xs leading-5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-1 ${
                errors.message
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-gray-900 focus:ring-gray-900"
              }`}
            />

            {errors.message && (
              <p className="mt-1.5 text-[10px] text-red-500">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-gray-400">
            We'll never share your information with third parties.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 items-center justify-center rounded-lg bg-black px-6 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <span className="ml-2">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;

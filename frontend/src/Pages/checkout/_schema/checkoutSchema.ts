import type { CheckoutFormData } from "../_types/checkout";

export type CheckoutErrors = Partial<Record<keyof CheckoutFormData, string>>;

export const validateCheckout = (data: CheckoutFormData): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^(0|\+84)\d{9,10}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.address.trim()) {
    errors.address = "Please enter your address.";
  }

  if (!data.city.trim()) {
    errors.city = "Please select your city.";
  }

  if (!data.district.trim()) {
    errors.district = "Please select your district.";
  }

  return errors;
};

import { useMemo, useState } from "react";

import type { CheckoutFormData, CheckoutOrder } from "../_types/checkout";

import {
  validateCheckout,
  type CheckoutErrors,
} from "../_schema/checkoutSchema";

const initialForm: CheckoutFormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  district: "",
  note: "",
  paymentMethod: "cod",
};

export const useCheckout = () => {
  const [form, setForm] = useState<CheckoutFormData>(initialForm);

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof CheckoutFormData>(
    field: K,
    value: CheckoutFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const validationErrors = validateCheckout(form);

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const submitOrder = async (order: CheckoutOrder) => {
    if (!validate()) {
      return false;
    }

    try {
      setIsSubmitting(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1200);
      });

      console.log("Checkout order:", order);

      setIsSuccess(true);

      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return {
    form,
    errors,
    hasErrors,
    isSubmitting,
    isSuccess,
    updateField,
    submitOrder,
  };
};

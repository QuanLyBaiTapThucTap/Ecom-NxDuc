import { useMemo, useRef, useState } from "react";

import type { CheckoutFormData, CheckoutOrder } from "../_types/checkout";

import {
  validateCheckout,
  type CheckoutErrors,
} from "../_schema/checkoutSchema";

import { checkoutService } from "../_services/checkoutService";

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
  const [submitError, setSubmitError] = useState("");
  const requestId = useRef(crypto.randomUUID());
  const submitting = useRef(false);

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
    if (submitting.current || !validate()) {
      return false;
    }

    try {
      submitting.current = true;
      setIsSubmitting(true);
      setSubmitError("");

      await checkoutService.createOrder(order, requestId.current);

      setIsSuccess(true);

      return true;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to place order.");
      return false;
    } finally {
      submitting.current = false;
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
    submitError,
    updateField,
    submitOrder,
  };
};

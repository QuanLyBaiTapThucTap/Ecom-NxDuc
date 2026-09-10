import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { productService } from "../_services/productService";
import type { Product } from "../_types/product";

export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productId = Number(id);
    if (!id || Number.isNaN(productId)) {
      Promise.resolve().then(() => {
        setProduct(null);
        setLoading(false);
      });
      return;
    }

    productService
      .getProduct(productId)
      .then(setProduct)
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to fetch product",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};

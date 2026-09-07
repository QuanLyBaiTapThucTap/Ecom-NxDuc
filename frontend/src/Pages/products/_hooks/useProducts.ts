import { useEffect, useState } from "react";

import { productService } from "@/Pages/products/_services/productService";
import type { Product } from "@/Pages/products/_types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await productService.getProducts();

        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};

import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useProducts } from "./useProducts";
import { productDetails } from "../_utils/productDetails";

export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { products, loading, error } = useProducts();

  const product = useMemo(() => {
    if (!id || products.length === 0) {
      return null;
    }

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return null;
    }

    const baseProduct = products.find((item) => item.id === productId);

    if (!baseProduct) {
      return null;
    }

    const detail = productDetails[productId] ?? {};

    return {
      ...baseProduct,
      ...detail,

      images:
        detail.images && detail.images.length > 0
          ? detail.images
          : [baseProduct.image],

      oldPrice: detail.oldPrice ?? Number((baseProduct.price * 1.2).toFixed(2)),

      variants: detail.variants ?? {},

      specifications: detail.specifications ?? [],

      promotions: detail.promotions ?? [],

      gifts: detail.gifts ?? [],

      reviews: detail.reviews ?? [],

      stock: detail.stock ?? 0,

      warranty: detail.warranty ?? "12 months",
    };
  }, [id, products]);

  return {
    product,
    loading,
    error,
  };
};

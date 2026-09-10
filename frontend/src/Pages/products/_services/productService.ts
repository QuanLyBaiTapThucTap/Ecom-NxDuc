import { apiRequest } from "@/Services/api";
import type { Product } from "@/Pages/products/_types/product";

const getProducts = async (): Promise<Product[]> => {
  return apiRequest<Product[]>("/products");
};

const getProduct = async (id: number): Promise<Product> => {
  return apiRequest<Product>(`/products/${id}`);
};

export const productService = {
  getProducts,
  getProduct,
};

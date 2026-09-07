import productsData from "../../../../../javascript-basic-exercises/data/products.json";
import type { Product } from "@/Pages/products/_types/product";

const getProducts = async (): Promise<Product[]> => {
  return productsData as Product[];
};

export const productService = {
  getProducts,
};

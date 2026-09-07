import type { Product } from "@/Pages/products/_types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

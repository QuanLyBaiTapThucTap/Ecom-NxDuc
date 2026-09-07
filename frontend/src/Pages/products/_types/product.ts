export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductVariant {
  colors?: string[];
  storages?: string[];
  rams?: string[];
  versions?: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductGift {
  name: string;
  image?: string;
  description?: string;
}

export interface ProductPromotion {
  title: string;
  description?: string;
}

export interface ProductReview {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: ProductRating;

  // Product detail
  oldPrice?: number;
  images?: string[];

  // Brand
  brand?: string;

  // Product variants
  variants?: ProductVariant;

  // Technical specifications
  specifications?: ProductSpecification[];

  // Warranty / stock
  warranty?: string;
  stock?: number;

  // Promotions
  promotions?: ProductPromotion[];

  // Gifts
  gifts?: ProductGift[];

  // Reviews
  reviews?: ProductReview[];
}

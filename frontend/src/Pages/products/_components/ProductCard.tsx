import type { Product } from "@/Pages/products/_types/product";
import { useCart } from "@/Pages/cart/_hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  computers: "Computers",
  mobiles: "Mobiles",
  televisions: "Televisions",
  audios: "Audios",
  accessories: "Accessories",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const rating = product.rating?.rate ?? 0;
  const ratingCount = product.rating?.count ?? 0;

  const category = categoryLabels[product.category] ?? product.category;

  return (
    <article className="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* IMAGE */}
      <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-[#f7f7f7]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />

        {/* SALE */}
        <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
          Sale
        </span>

        {/* WISHLIST */}
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-gray-500 shadow-sm transition hover:text-red-500"
        >
          ♡
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* CATEGORY */}
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {category}
        </p>

        {/* TITLE */}
        <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-gray-900">
          {product.title}
        </h3>

        {/* RATING */}
        <div className="mt-2 flex items-center gap-1">
          <span className="text-xs text-yellow-500">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
          </span>

          <span className="text-xs font-medium text-gray-600">
            {rating.toFixed(1)}
          </span>

          <span className="text-[11px] text-gray-400">({ratingCount})</span>
        </div>

        {/* PRICE */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 h-10 w-full rounded-lg bg-black text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

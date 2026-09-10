import { Link } from "react-router-dom";
import { useWishlist } from "./useWishlist";
import ProductCard from "./_components/ProductCard";
export default function WishlistPage() {
 const { items } = useWishlist();
 return <div className="mx-auto max-w-[1200px] p-6"><h1 className="mb-6 text-2xl font-bold">Wishlist</h1>{items.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{items.map(product => <ProductCard key={product.id} product={product}/>)}</div> : <p>No saved products. <Link to="/products" className="underline">Browse products</Link></p>}</div>;
}

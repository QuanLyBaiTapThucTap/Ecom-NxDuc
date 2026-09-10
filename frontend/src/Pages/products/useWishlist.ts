import { createContext, createElement, useContext, useEffect, useState } from "react";
import type { Product } from "./_types/product";
function useWishlistState() {
 const [items,setItems] = useState<Product[]>(() => { try { const data = JSON.parse(localStorage.getItem("ecom-wishlist") || "[]"); return Array.isArray(data) ? data.filter(p => p && typeof p.id === "number" && typeof p.price === "number" && typeof p.title === "string") : []; } catch { return []; } });
 useEffect(() => { localStorage.setItem("ecom-wishlist", JSON.stringify(items)); }, [items]);
 return { items, toggle: (product: Product) => setItems(current => current.some(p => p.id === product.id) ? current.filter(p => p.id !== product.id) : [...current,product]) };
}
const Context = createContext<ReturnType<typeof useWishlistState> | null>(null);
export function WishlistProvider({children}: {children: React.ReactNode}) { return createElement(Context.Provider,{value: useWishlistState()},children); }
export function useWishlist() { const value = useContext(Context); if (!value) throw new Error("WishlistProvider required"); return value; }

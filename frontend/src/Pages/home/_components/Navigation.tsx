import { NavLink } from "react-router-dom";
export default function Navigation() {
 return <nav className="border-b"><div className="mx-auto flex max-w-[1200px] flex-wrap gap-5 px-4 py-4">
 {[["/", "Home"], ["/products", "All Products"], ["/contact", "Contact"], ["/account", "My Account"], ["/account/orders", "My Orders"]].map(([path, label]) => <NavLink key={path} to={path} end className={({isActive}) => `text-sm ${isActive ? "font-bold underline" : "text-gray-600"}`}>{label}</NavLink>)}
 </div></nav>;
}

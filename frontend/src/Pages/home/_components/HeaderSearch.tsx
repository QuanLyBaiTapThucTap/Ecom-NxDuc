import { useNavigate } from "react-router-dom";
export default function HeaderSearch() {
 const navigate = useNavigate();
 return <form onSubmit={event => { event.preventDefault(); const query = new FormData(event.currentTarget).get("q")?.toString() || ""; navigate(`/products?q=${encodeURIComponent(query)}`); }} className="flex min-w-0 flex-1"><input name="q" type="search" aria-label="Search products" placeholder="Search anything..." className="h-11 min-w-0 w-full rounded-l-md border px-4 text-sm"/><button type="submit" aria-label="Search" className="h-11 w-12 rounded-r-md bg-black text-white">&#128269;</button></form>;
}

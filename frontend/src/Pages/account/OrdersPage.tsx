import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkoutService, type SavedOrder } from "@/Pages/checkout/_services/checkoutService";
export default function OrdersPage() {
 const [orders,setOrders] = useState<SavedOrder[]>([]); const [loading,setLoading] = useState(true); const [error,setError] = useState("");
 useEffect(() => { let active = true; checkoutService.getOrders().then(data => {if(active) setOrders(data);}).catch(err => {if(active) setError(err.message);}).finally(() => {if(active) setLoading(false);}); return () => {active=false;}; },[]);
 return <section className="space-y-5 rounded-xl bg-white p-6"><h1 className="text-xl font-bold">My Orders</h1>{loading && <p>Loading orders...</p>}{error && <p role="alert">{error}</p>}{!loading && !error && !orders.length && <p>No orders yet. <Link to="/products" className="underline">Start shopping</Link></p>}
 {orders.map(order => <article key={order.id} className="space-y-3 rounded-lg border p-4"><h2 className="font-bold">Order #{order.id}</h2><p>{new Date(order.createdAt).toLocaleString()} | {order.status} | {order.paymentStatus}</p>{order.items.map(item => <div key={item.productId} className="flex justify-between gap-4"><Link to={`/products/${item.productId}`} className="underline">{item.title} x {item.quantity}</Link><span>${(item.price*item.quantity).toFixed(2)}</span></div>)}<p>Delivery: {order.shipping.fullName}, {order.shipping.address}, {order.shipping.city}</p><p className="font-bold">Total: ${order.total.toFixed(2)}</p></article>)}</section>;
}

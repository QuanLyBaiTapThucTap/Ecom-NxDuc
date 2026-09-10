import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/home/HomePage";
import LoginPage from "./Pages/auth/LoginPage";
import RegisterPage from "./Pages/auth/RegisterPage";
import CartPage from "./Pages/cart/CartPage";
import AccountPage from "@/Pages/account/AccountPage";
import ContactPage from "@/Pages/contact/ContactPage";
import CheckoutPage from "@/Pages/checkout/CheckoutPage";
import ProductDetailPage from "@/Pages/products/ProductDetailPage";
import ProductsPage from "@/Pages/products/ProductsPage";
import { CartProvider } from "@/Pages/cart/_hooks/useCart";
import { AuthProvider } from "./Pages/auth/useAuth";
import ProtectedRoute from "./Pages/auth/ProtectedRoute";
import ProfileForm from "./Pages/account/_components/ProfileForm";
import SecurityPage from "./Pages/account/SecurityPage";
import OrdersPage from "./Pages/account/OrdersPage";
import WishlistPage from "./Pages/products/WishlistPage";
import { WishlistProvider } from "./Pages/products/useWishlist";
import ScrollToTop from "@/Components/ScrollToTop";
import { Toaster } from "sonner";
import AdminRoute from "@/Pages/admin/AdminRoute";
import AdminLayout from "@/Layouts/AdminLayout";
import AdminDashboardPage from "@/Pages/admin/dashboard/AdminDashboardPage";
import AnalyticsTracker from "@/Components/AnalyticsTracker";
import AdminOrdersPage from "@/Pages/admin/orders/AdminOrdersPage";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <AnalyticsTracker />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/account" element={<AccountPage />}>
                    <Route index element={<ProfileForm />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="security" element={<SecurityPage />} />
                  </Route>
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Route>
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route
                  path="*"
                  element={
                    <div className="p-12 text-center">
                      <h1>404 - Page not found</h1>
                      <Link to="/">Back to home</Link>
                    </div>
                  }
                />
              </Route>
              <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route
                    path="/admin/dashboard"
                    element={<AdminDashboardPage />}
                  />

                  <Route
                    path="/admin/products"
                    element={<div>Admin Products</div>}
                  />

                  <Route path="/admin/orders" element={<AdminOrdersPage />} />

                  <Route path="/admin/users" element={<div>Admin Users</div>} />
                </Route>
              </Route>
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

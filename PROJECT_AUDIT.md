# PROJECT AUDIT — E-COMMERCE REACT / TYPESCRIPT

> **Thời điểm kiểm tra:** 14/09/2026  
> **Dự án:** E-commerce React / TypeScript Portfolio Application  
> **Workspace:** `Ecom NxDuc`  
> **Kiến trúc:** Frontend (`frontend/`) + Express REST API Mock Server (`javascript-basic-exercises/`)

---

## 1. Project Overview

Dự án là một hệ thống E-commerce hoàn chỉnh phục vụ mục đích học tập chuyên sâu và xây dựng Portfolio Frontend chất lượng cao (Senior / Mid-level standard).

- **Mục tiêu cốt lõi:** Thể hiện năng lực phát triển Frontend xuất sắc: UI/UX, React 19, TypeScript, React Router v7, Tailwind CSS v4, State Management, Form Handling & Validation, Data Flow, Cart isolation per user, Responsive Design, Error Handling và Admin Dashboard thực tế.
- **Backend:** Node.js Express đơn giản, sử dụng JSON files làm cơ sở lưu trữ dữ liệu (không dùng MongoDB/PostgreSQL/ORM để giữ đúng tinh thần frontend-first). Cung cấp REST API cho Products, Users, Carts, Orders, Contacts, và JWT Authentication.

---

## 2. Current Architecture

Hệ thống hoạt động theo mô hình Client-Server:

```text
┌────────────────────────────────────────────────────────┐
│               React Frontend (:5173)                   │
│  - React 19 + TypeScript + Vite + Tailwind CSS v4      │
│  - React Router v7 (MainLayout & AdminLayout)          │
│  - Context: AuthContext, CartContext, WishlistContext  │
│  - Services: apiRequest (JWT auto-refresh), Analytics  │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / JSON (REST API)
                            ▼
┌────────────────────────────────────────────────────────┐
│            Express Mock Server (:4000)                 │
│  - server.js                                           │
│  - Routes: /auth, /products, /users, /carts, /orders   │
│  - Storage Engine: JsonCollection (fs read/write)      │
└───────────────────────────┬────────────────────────────┘
                            │ Đọc / Ghi file
                            ▼
┌────────────────────────────────────────────────────────┐
│              Data Storage (*.json)                     │
│  - products.json, users.json, carts.json               │
│  - orders.json, contacts.json                          │
└────────────────────────────────────────────────────────┘
```

- **Giao thức API:** `frontend/src/Services/api.ts` quản lý `accessToken` và `refreshToken`, tự động đính kèm `Authorization: Bearer <token>`, tự động gọi `/auth/refresh-token` khi gặp HTTP 401 và retry request một lần.

---

## 3. Frontend Structure

```text
frontend/src/
├── App.tsx                               # Router chính, Providers & Toast setup
├── main.tsx                              # React DOM render root
├── index.css                             # Tailwind CSS v4 và keyframes (cart-bounce)
├── Layouts/
│   ├── MainLayout.tsx                   # Customer layout (PromotionBar, Header, Nav, Breadcrumb, Footer)
│   └── AdminLayout.tsx                  # Admin layout (Sidebar, Admin Header)
├── Components/
│   ├── AnalyticsTracker.tsx             # Theo dõi route changes -> PAGE_VIEW
│   ├── ScrollToTop.tsx                  # Tự động cuộn đầu trang khi chuyển route
│   └── ui/Container.tsx                 # Responsive wrapper container
├── Pages/
│   ├── home/                            # Trang chủ với các banner, category, deal, showcase
│   ├── products/                        # Danh sách sản phẩm, chi tiết sản phẩm, wishlist
│   ├── auth/                            # Đăng nhập, đăng ký, ProtectedRoute, useAuth
│   ├── cart/                            # Trang giỏ hàng, CartItem, CartSummary, animation
│   ├── checkout/                        # Trang thanh toán, form giao hàng, order summary
│   ├── account/                         # Trang cá nhân, profile form, security, my orders
│   ├── admin/                           # AdminRoute, dashboard, orders, (products, users)
│   └── contact/                         # Trang liên hệ
└── Services/
    ├── api.ts                           # Client HTTP, token storage & refresh token
    └── analyticsService.ts              # Event tracking lưu localStorage
```

---

## 4. Backend Structure

```text
javascript-basic-exercises/
├── server.js                            # Express app entry point
├── package.json                         # Node dependencies (express, cors, jsonwebtoken)
├── src/
│   ├── config.js                        # JWT secrets & token expiry
│   ├── db.js                            # JsonCollection class (đọc/ghi JSON bằng fs)
│   ├── middleware/auth.js               # authenticateToken & authorizeRoles
│   └── routes/
│       ├── auth.routes.js               # /auth/login, /auth/refresh-token, /auth/logout, /auth/me, /auth/password
│       ├── products.routes.js           # /products (GET, POST, PUT, PATCH, DELETE)
│       ├── users.routes.js              # /users (GET, POST, PUT, PATCH, DELETE)
│       ├── carts.routes.js              # /carts (GET, POST, PUT, PATCH, DELETE)
│       └── orders.routes.js             # /orders (GET, POST)
└── data/
    ├── products.json                    # 10,000+ dòng sản phẩm với đầy đủ chi tiết
    ├── users.json                       # Danh sách users (admin, customer)
    ├── carts.json                       # Dữ liệu giỏ hàng
    ├── orders.json                      # Dữ liệu đơn đặt hàng
    └── contacts.json                    # Tin nhắn liên hệ gửi từ /contact
```

---

## 5. Data Structure

### 5.1. Product Schema (`products.json`)
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  brand?: string;
  rating?: { rate: number; count: number };
  variants?: {
    colors?: string[];
    storages?: string[];
    rams?: string[];
    versions?: string[];
  };
  specifications?: Array<{ label: string; value: string }>;
  warranty?: string;
  stock?: number;
  promotions?: Array<{ title: string; description: string }>;
}
```

### 5.2. User Schema (`users.json`)
```typescript
interface User {
  id: number;
  email: string;
  username: string;
  password: string; // Plaintext trong mock
  name: { firstname: string; lastname: string };
  phone?: string;
  address?: {
    city?: string;
    street?: string;
    number?: number;
    zipcode?: string;
    geolocation?: { lat: string; long: string };
  };
  role: "admin" | "customer";
}
```

### 5.3. Order Schema (`orders.json`)
```typescript
interface Order {
  id: number;
  userId: number;
  requestId: string;
  items: Array<{
    productId: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  shipping: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    note: string;
  };
  paymentMethod: "cod";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid";
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}
```

### 5.4. Cart Schema (`carts.json`)
```typescript
interface CartRecord {
  id: number;
  userId: number;
  date: string;
  products: Array<{ productId: number; quantity: number }>;
}
```

---

## 6. Authentication

- **Trạng thái:** Đã kết nối API thật (`/auth/login`, `/auth/refresh-token`, `/auth/logout`, `/auth/me`).
- **Lưu trữ Token:** `authStorage` lưu vào `localStorage` nếu chọn "Remember me", hoặc `sessionStorage` nếu không chọn.
- **Header:** Đã có `HeaderActions` hiển thị avatar / logout.
- **Điểm yếu hiện tại:**
  - Header CHƯA hiển thị nút **Admin** khi `user.role === 'admin'`. Admin phải tự gõ URL `/admin/dashboard`.
  - Chưa phân biệt rõ 3 trạng thái của Header theo yêu cầu: Guest, Customer, Admin.

---

## 7. Cart System

- **Trạng thái hiện tại:** Quản lý bằng `CartProvider` (`useCart.ts`).
- **CÁC VẤN ĐỀ NGHIÊM TRỌNG:**
  1. **Dùng chung key localStorage:** Sử dụng key cố định `ecom-cart`. User A, User B và Admin đều dùng chung một giỏ hàng trên cùng trình duyệt.
  2. **Chưa đồng bộ theo User:** Chưa có cơ chế giỏ hàng theo từng user (`ecom-cart-${userId}`) và chưa đồng bộ lên backend `/carts/:userId`.
  3. **Hard-coded Voucher trong `CartPage.tsx`:**
     ```tsx
     <CartSummary
       voucher="SAVE10"
       appliedVoucher="SAVE10"
       setVoucher={() => {}}
       applyVoucher={() => {}}
     />
     ```
     Props voucher bị gán cứng, các hàm set/apply là hàm rỗng no-op!
  4. **ProductActions Loop Bug:** Khi thêm số lượng `quantity > 1`, `ProductActions.tsx` gọi `addToCart(product)` trong vòng lặp `for` thay vì truyền trực tiếp `quantity`.
  5. **Xử lý Logout:** Khi logout, giỏ hàng hiện tại không được reset trong React state, khiến user đăng nhập tiếp theo nhìn thấy sản phẩm của user trước.

---

## 8. Products System

- **Product Listing (`/products`):**
  - Mới chỉ có search tên và nút lọc category dạng pill nằm ngang.
  - **Thiếu:** Lọc theo khoảng giá (Price Range Filter), sắp xếp (Giá tăng dần, Giá giảm dần, Mới nhất), phân trang (Pagination).
- **Product Detail (`/products/:id`):**
  - Đã có giao diện phong phú: Gallery, Breadcrumb, Specification, Description, Reviews, Related Products.
  - Cần đảm bảo: Xử lý hết hàng (`stock <= 0`), giới hạn số lượng không vượt quá `stock`, nút "Buy Now" đưa thẳng tới `/cart` hoặc `/checkout`.

---

## 9. Checkout Flow

- **Trạng thái:** Form thông tin giao hàng có validation, chọn phương thức COD, có Modal xác nhận đơn hàng ("Place Order" -> Modal Confirmation -> "Confirm Order").
- **Vấn đề:**
  - Bị lưu trùng đơn: gọi cả `checkoutService.createOrder` (API `/orders`) và `orderService.createOrder` (localStorage `ecom-orders`). Cần thống nhất dùng duy nhất API backend.
  - Đã có logic chỉ xóa các sản phẩm được chọn (`selectedItems`), cần giữ vững và test chặt chẽ.

---

## 10. Orders System

- **Customer Orders (`/account/orders`):**
  - Giao diện hiện tại rất thô sơ (unstyled, văn bản raw không có style Tailwind, thiếu trạng thái trực quan, thiếu badge status đẹp mắt).
- **Admin Orders (`/admin/orders`):**
  - Đang đọc dữ liệu từ `localStorage` (`orderService.getAllOrders()`) thay vì gọi API `/orders` từ backend `orders.json`!
  - Backend `orders.routes.js`: `GET /orders` hiện chỉ lọc `order.userId === req.user.id`. Khi Admin đăng nhập và gọi, backend chỉ trả về đơn của riêng admin (0 đơn) thay vì tất cả các đơn của hệ thống!
  - Backend thiếu endpoint cập nhật trạng thái đơn: `PUT /orders/:id/status`.

---

## 11. Admin Panel

- **Admin Route Guard (`AdminRoute.tsx`):** Đã kiểm tra `user.role === "admin"`. Khách chưa login chuyển về `/login`, customer chuyển về `/account`.
- **Admin Dashboard (`/admin/dashboard`):**
  - Đang hardcode số liệu tĩnh: 100 products, 25 orders, $125,500 revenue!
  - Hoàn toàn chưa có biểu đồ doanh thu (Revenue Chart), phân bổ đơn hàng (Order Analytics), Top sản phẩm bán chạy (Top Products), Đơn hàng gần đây (Recent Orders) từ dữ liệu thật.
- **Admin Products (`/admin/products`):**
  - Route chỉ hiển thị `<div>Admin Products</div>`! Chưa có trang quản lý sản phẩm.
- **Admin Users (`/admin/users`):**
  - Route chỉ hiển thị `<div>Admin Users</div>`! Chưa có trang quản lý khách hàng.
- **Admin Layout (`AdminLayout.tsx`):**
  - Cần nâng cấp Sidebar theo đúng spec (MAIN, ANALYTICS, SYSTEM, Back to shop, Administrator profile).

---

## 12. Current Bugs List

| # | Bug | Nguyên nhân | Tác động |
|---|-----|-------------|----------|
| 1 | Dùng chung giỏ hàng giữa mọi user | Dùng 1 key localStorage `ecom-cart` | User A thấy giỏ hàng của User B |
| 2 | Hardcoded voucher trong `CartPage.tsx` | Props `voucher="SAVE10"`, handler `() => {}` | Không nhập hoặc xóa voucher được |
| 3 | Vòng lặp `for` khi thêm giỏ hàng | `ProductActions.tsx` gọi `addToCart` nhiều lần | Tạo nhiều event và cập nhật state liên tục |
| 4 | Trùng lặp lưu đơn hàng | `CheckoutPage.tsx` gọi cả API `/orders` và localStorage `orderService` | Dữ liệu bị phân mảnh giữa API và localStorage |
| 5 | Admin Orders đọc từ localStorage | `useAdminOrders.ts` gọi `orderService.getAllOrders()` | Admin không thấy các đơn hàng lưu trong `orders.json` |
| 6 | Backend `GET /orders` không cho Admin xem tất cả đơn | `orders.routes.js` lọc cứng `userId === req.user.id` | Admin chỉ thấy 0 đơn hàng |
| 7 | Backend thiếu `PUT /orders/:id/status` | Chưa có route cập nhật status | Không cập nhật trạng thái đơn hàng trên server |
| 8 | Thiếu nút Admin trên Header | `HeaderActions.tsx` chưa check `user.role === 'admin'` | Admin phải gõ URL thủ công |
| 9 | Giỏ hàng không reset khi logout | Không clear cart state khi đăng xuất | User mới login có nguy cơ thấy giỏ cũ |

---

## 13. Missing Features

1. **Admin Products Management (`/admin/products`):**
   - Bảng hiển thị danh sách sản phẩm (ảnh, tên, danh mục, giá, tồn kho, thao tác).
   - Thanh tìm kiếm, lọc theo Category, lọc theo trạng thái tồn kho (In stock / Low stock / Out of stock).
   - Phân trang bảng sản phẩm.
   - Modal Thêm sản phẩm mới (`POST /products`).
   - Modal Chỉnh sửa sản phẩm (`PUT /products/:id`).
   - Xóa sản phẩm có modal xác nhận (`DELETE /products/:id`).
   - Lưu trữ trực tiếp vào `products.json` qua Express API.
2. **Admin Dashboard (`/admin/dashboard`):**
   - 4 thẻ KPI động: Total Revenue, Total Orders, Total Customers, Total Products.
   - Biểu đồ doanh thu thuần SVG/CSS responsive (chế độ xem 7 ngày / 30 ngày).
   - Phân tích trạng thái đơn hàng (Pending, Confirmed, Completed, Cancelled) dạng CSS/SVG Donut/Progress bar.
   - Bảng Top 5 sản phẩm bán chạy nhất tính từ `orders.json`.
   - Bảng Đơn hàng gần đây (Recent Orders) với nút "View all" điều hướng `/admin/orders`.
3. **Admin Customers Management (`/admin/users`):**
   - Bảng quản lý khách hàng lấy từ `GET /users`.
   - Hiển thị: Avatar, Tên, Email, Số điện thoại, Role, Số lượng đơn đã đặt, Tổng chi tiêu.
   - Ô tìm kiếm khách hàng theo tên/email.
4. **Product Filters & Pagination (`/products`):**
   - Lọc theo khoảng giá (Min Price - Max Price inputs / presets).
   - Sắp xếp: Giá tăng dần, Giá giảm dần, Mới nhất.
   - Phân trang (Pagination) chuẩn UI/UX.
5. **My Orders UI (`/account/orders`):**
   - Thiết kế lại toàn bộ giao diện danh sách đơn hàng cho khách hàng: Card chi tiết từng đơn, Badge trạng thái có màu sắc chuẩn, ngày đặt, danh sách món hàng, tổng thanh toán, địa chỉ giao hàng.
   - Empty state khi chưa có đơn hàng với nút "Explore Products".

---

## 14. UI / UX Problems

1. **Header:** Không có nút "Admin" cho tài khoản admin; thiếu trạng thái hiển thị rõ rệt giữa Guest, Customer, Admin.
2. **Account Section:** Trang `OrdersPage.tsx`, `ProfileForm.tsx`, `SecurityPage.tsx` đang có giao diện sơ sài, thiếu card container tinh tế, thiếu icon và visual hierarchy.
3. **Admin Layout:** Sidebar hiện tại đơn điệu, chưa chia nhóm Menu rõ ràng (MAIN, ANALYTICS, SYSTEM).
4. **Products Page:** Lưới sản phẩm thiếu sidebar filter chuyên nghiệp, thiếu bộ chọn sắp xếp và phân trang.

---

## 15. Technical Debt

1. **Tồn tại 2 hệ thống Order song song:** `orderService.ts` (lưu localStorage `ecom-orders`) và `checkoutService.ts` (gọi Express API `/orders`). Cần loại bỏ sự phụ thuộc vào localStorage và quy về API chuẩn duy nhất.
2. **Cart state:** Cần gắn kết chặt chẽ với vòng đời của `user` (đăng nhập -> nạp giỏ của user đó; đăng xuất -> xóa giỏ khỏi state; khách chưa đăng nhập -> giỏ khách riêng biệt).
3. **TypeScript Types:** Cần chuẩn hóa kiểu dữ liệu cho `Order`, `Product`, `User`, `Cart` để tránh lệch pha giữa client và server.

---

## 16. Recommended Implementation Order

- [x] **PHASE 0 — Audit & System Analysis** (Hoàn thành tài liệu `PROJECT_AUDIT.md`)
- [ ] **PHASE 1 — Customer Core:**
  - Header: Thêm nút Admin khi `user.role === 'admin'`, phân biệt Guest/Customer/Admin.
  - Cart: Tách cart theo user (`ecom-cart-${userId}`), đồng bộ API backend `/carts/:userId`, sửa lỗi hardcoded voucher trong `CartPage.tsx`, sửa loop bug trong `ProductActions.tsx`, reset cart khi logout.
  - Products Page: Thêm lọc giá, sắp xếp giá/mới nhất, phân trang, loading/empty state.
- [ ] **PHASE 2 — Checkout & Customer Orders:**
  - Chuẩn hóa backend `/orders` (hỗ trợ Admin lấy tất cả đơn, `PUT /orders/:id/status`, `GET /orders/:id`).
  - Checkout: Dùng duy nhất API backend, loại bỏ duplicate localStorage order.
  - My Orders (`/account/orders`): Thiết kế lại giao diện hiện đại, responsive, trạng thái đẹp mắt.
  - Profile & Security: Nâng cấp UI/UX cho trang cá nhân.
- [ ] **PHASE 3 — Admin Foundation:**
  - Nâng cấp `AdminLayout.tsx` với Sidebar phân nhóm chuẩn (MAIN, ANALYTICS, SYSTEM, profile, logout, back to shop).
  - Đảm bảo AdminRoute bảo vệ chặt chẽ và responsive trên mọi màn hình.
- [ ] **PHASE 4 — Admin Dashboard:**
  - Tính toán dữ liệu thật từ `products.json`, `orders.json`, `users.json`.
  - 4 KPI cards có so sánh & icon.
  - Revenue Chart bằng SVG thuần (7 ngày / 30 ngày).
  - Phân bổ Order Status.
  - Top 5 sản phẩm bán chạy nhất.
  - Recent Orders table với link "View all".
- [ ] **PHASE 5 — Admin Products Management:**
  - Xây dựng trang `/admin/products` hoàn chỉnh: Bảng dữ liệu, ảnh, giá, stock, actions.
  - Tìm kiếm, lọc danh mục, lọc tồn kho, phân trang.
  - Modal Add/Edit product với đầy đủ validation và gọi `POST /products`, `PUT /products/:id`.
  - Xóa sản phẩm với `DELETE /products/:id`.
- [ ] **PHASE 6 — Admin Orders & Users:**
  - Trang `/admin/orders`: Đọc từ API thật, xem chi tiết đơn hàng (Modal), đổi trạng thái đơn (`PUT /orders/:id/status`), filter trạng thái.
  - Trang `/admin/users`: Đọc từ `GET /users`, hiển thị thông tin khách hàng, số đơn, tổng tiền đã mua, tìm kiếm.
- [ ] **PHASE 7 — UI/UX Polish & Responsive QA:**
  - Kiểm tra Header, Navigation, Cart flying animation, Modal, Forms, Toast.
  - Responsive kiểm tra kỹ mobile, tablet, desktop.
- [ ] **PHASE 8 — Comprehensive Documentation:**
  - Viết toàn bộ 19 file tài liệu trong thư mục `docs/` dành cho người học Frontend và phỏng vấn.
- [ ] **PHASE 9 — Final QA & Build Check:**
  - Kiểm tra `npm run build`, chạy test, route flow, cart isolation, admin flow.

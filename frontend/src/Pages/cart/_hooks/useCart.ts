import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Product } from "@/Pages/products/_types/product";
import type { CartItem } from "../_types/cart";
import { useAuth } from "@/Pages/auth/useAuth";
import { apiRequest } from "@/Services/api";

function getStorageKey(userId?: number | null): string {
  return userId ? `ecom-cart-user-${userId}` : "ecom-cart-guest";
}

function loadLocalCart(key: string): CartItem[] {
  try {
    const storedCart = localStorage.getItem(key);
    const parsed: unknown = storedCart ? JSON.parse(storedCart) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item &&
        item.product &&
        typeof item.product.id === "number" &&
        typeof item.product.title === "string" &&
        typeof item.product.price === "number" &&
        Number.isFinite(item.product.price) &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        typeof item.selected === "boolean",
    );
  } catch (error) {
    console.error("Failed to load cart from storage key:", key, error);
    return [];
  }
}

const useCartState = () => {
  const { user } = useAuth();
  const currentUserId = user?.id ?? null;
  const prevUserIdRef = useRef<number | null>(currentUserId);

  const [items, setItems] = useState<CartItem[]>(() =>
    loadLocalCart(getStorageKey(currentUserId)),
  );
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  // Khi user thay đổi (đăng nhập hoặc đăng xuất), chuyển đổi giỏ hàng tương ứng
  useEffect(() => {
    if (prevUserIdRef.current !== currentUserId) {
      prevUserIdRef.current = currentUserId;
      const key = getStorageKey(currentUserId);
      const userItems = loadLocalCart(key);
      setItems(userItems);
      setVoucher("");
      setAppliedVoucher(null);

      // Nếu người dùng đã đăng nhập, thử lấy giỏ hàng từ backend nếu local đang rỗng
      if (currentUserId) {
        apiRequest<{ products?: Array<{ productId: number; quantity: number }> }>(
          `/carts/${currentUserId}`,
        )
          .then((remoteCart) => {
            if (
              remoteCart &&
              Array.isArray(remoteCart.products) &&
              remoteCart.products.length > 0 &&
              userItems.length === 0
            ) {
              // Remote cart có sản phẩm nhưng local chưa có
            }
          })
          .catch(() => {
            // Không block UI nếu mạng lỗi
          });
      }
    }
  }, [currentUserId]);

  // Lưu vào localStorage tương ứng với user hiện tại và đồng bộ backend
  useEffect(() => {
    const key = getStorageKey(currentUserId);
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }

    if (currentUserId) {
      const timer = setTimeout(() => {
        apiRequest(`/carts/${currentUserId}`, {
          method: "PUT",
          body: JSON.stringify({
            userId: currentUserId,
            products: items.map((it) => ({
              productId: it.product.id,
              quantity: it.quantity,
            })),
          }),
        }).catch(() => {
          // Bỏ qua lỗi ngầm khi đồng bộ background
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [items, currentUserId]);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock !== undefined && product.stock <= 0) return;
    const addQty = Math.max(1, quantity);
    const maxStock = product.stock ?? 999;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                selected: true,
                quantity: Math.min(
                  item.quantity + addQty,
                  maxStock,
                ),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity: Math.min(addQty, maxStock),
          selected: true,
        },
      ];
    });
  };

  const increaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock ?? 999),
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  };

  const toggleItem = (productId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              selected: !item.selected,
            }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    setVoucher("");
    setAppliedVoucher(null);
  };

  const applyVoucher = () => {
    const normalizedVoucher = voucher.trim().toUpperCase();

    if (!normalizedVoucher) {
      setAppliedVoucher(null);
      return;
    }

    if (normalizedVoucher === "SAVE10") {
      setAppliedVoucher("SAVE10");
      return;
    }

    setAppliedVoucher(null);
  };

  const selectedItems = useMemo(
    () => items.filter((item) => item.selected),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const selectedQuantity = useMemo(
    () => selectedItems.reduce((total, item) => total + item.quantity, 0),
    [selectedItems],
  );

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [selectedItems],
  );

  const discount = useMemo(() => {
    if (appliedVoucher === "SAVE10") {
      return Math.round(subtotal * 10) / 100;
    }

    return 0;
  }, [appliedVoucher, subtotal]);

  const shipping = subtotal >= 100 ? 0 : subtotal > 0 ? 10 : 0;

  const total = subtotal - discount + shipping;

  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const toggleAll = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
    );
  };

  return {
    items,
    selectedItems,

    voucher,
    appliedVoucher,

    totalQuantity,
    selectedQuantity,

    subtotal,
    discount,
    shipping,
    total,

    allSelected,

    setVoucher,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    toggleItem,
    toggleAll,
    clearCart,
    applyVoucher,
  };
};

type CartContextValue = ReturnType<typeof useCartState>;
const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCartState();
  return createElement(CartContext.Provider, { value: cart }, children);
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
};

import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/Pages/products/_types/product";
import type { CartItem } from "../_types/cart";

const STORAGE_KEY = "ecom-cart";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity: 1,
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
              quantity: item.quantity + 1,
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
      return subtotal * 0.1;
    }

    return 0;
  }, [appliedVoucher, subtotal]);

  const shipping = subtotal > 0 ? 0 : 0;

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

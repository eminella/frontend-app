// frontend-app/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleMiniCart: () => void;
  isMiniCartOpen: boolean;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);

  // 🛠️ Mount olduğunda localStorage’dan yükle
  useEffect(() => {
    const json = localStorage.getItem('eminellaCart');
    if (json) {
      try {
        setCartItems(JSON.parse(json));
      } catch {}
    }
  }, []);

  // 🛠️ cartItems değiştiğinde localStorage’a kaydet
  useEffect(() => {
    localStorage.setItem('eminellaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleMiniCart = () => {
    setMiniCartOpen((v) => !v);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        toggleMiniCart,
        isMiniCartOpen,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

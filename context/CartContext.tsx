// frontend-app/src/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  isMiniCartOpen: boolean;
  toggleMiniCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sepete ürün ekleme
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Sepetten ürün silme
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Mini-cart aç/kapa state’i
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const toggleMiniCart = () => setMiniCartOpen((v) => !v);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isMiniCartOpen,
        toggleMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Hook’u güncelledik
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

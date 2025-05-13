import { useState, useEffect } from "react";

const CART_KEY = "cart";

const getCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [cart, setCart] = useState(getCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.name === product.name);
      if (idx !== -1) {
        // Ya existe, suma cantidad correctamente
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: Number(updated[idx].quantity) + Number(quantity)
        };
        return updated;
      }
      return [...prev, { ...product, quantity: Number(quantity) }];
    });
  };

  const updateQuantity = (name, quantity) => {
    setCart(prev => prev.map(item => item.name === name ? { ...item, quantity } : item));
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}; 
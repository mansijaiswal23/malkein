import { createContext, useContext, useState } from "react";

import image from "../assets/images/m3.png"

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedSize, selectedColor) => {
    const item = { ...product, selectedSize, selectedColor, quantity: 1 };

    setCartItems((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === product.id &&
          p.selectedSize === selectedSize &&
          p.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (id, selectedSize, selectedColor, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total count of individual items (sum of quantities)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
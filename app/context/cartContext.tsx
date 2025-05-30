"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  baseURL,
  DecodedToken,
  CartContextType,
  CartItem,
  ProductsTypes,
} from "@/app/lib/constant";
import toast from "react-hot-toast";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    if (user) localStorage.setItem("user", JSON.stringify(user.token));
  }, [cartItems, user]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const addToCart = (product: ProductsTypes, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const update = prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity > product.stock
                    ? product.stock
                    : item.quantity + quantity,
              }
            : item
        );
        toast.success("Cart updated");
        return update;
      }
      toast.success("Added to cart");
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      )
    );
    toast.success("Cart item updated");
  };

  //   this function will be call in checkout page
  const checkout = async () => {
    if (!user?.sub) {
      toast.error("Login required");
      console.warn("No user logged in");
      return;
    }
    const payload = {
      userId: user.sub,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      console.log("sending to api", payload);
      const data = await axios.post(`${baseURL}/v1/create/order`, {
        methods: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: payload,
      });
      toast.success("Order placed successfully");
      console.log(data);
      setCartItems([]); // Clear cart
      localStorage.removeItem("cartItems"); // Option
    } catch (error) {
      console.error("error message", error);
      toast.error("Failed to place order");
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartCount,
        user,
        setUser,
        checkout,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

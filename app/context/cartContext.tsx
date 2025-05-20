"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductsTypes } from "../lib/constant";
import { baseURL } from "@/app/lib/constant";

interface CartItem extends ProductsTypes {
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email?: string;
  token: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductsTypes, quantity: number) => void;
  cartCount: number;
  user: User | null;
  setUser: (user: User | null) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user.token));
    else localStorage.removeItem("user");
  }, [user]);

  const addToCart = (product: ProductsTypes, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  //   this function will be call in checkout page
  const checkout = async () => {
    if (!user?.id) {
      console.warn("No user logged in");
      return;
    }
    const payload = {
      userId: user.id,
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
        console.log(data);
    } catch (error) {
      console.error("error message", error);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, cartCount, user, setUser, checkout }}
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

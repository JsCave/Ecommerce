"use client";
import { apiServices } from "@/services/api";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  handleAddToCart: (
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
};

export const cartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getCart() {
    const response = await apiServices.getUserCart();
    setCartCount(response.numOfCartItems);
    setIsLoading(false);
  }

  async function handleAddToCart(
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(productId);
    setCartCount(data.numOfCartItems);
    toast.success(data.message);
    setAddToCartLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider
      value={{ cartCount, setCartCount, isLoading, handleAddToCart }}
    >
      {children}
    </cartContext.Provider>
  );
}

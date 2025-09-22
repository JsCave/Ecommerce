"use client"

import { apiServices } from "@/services/api"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSession } from 'next-auth/react';

type CartContextType = {
  cartCount: number
  setCartCount: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  handleAddToCart: (
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const {data: session,status}=useSession()

  async function getCart() {
    if (status=="authenticated"){
      const response = await apiServices.getUserCart(session.token)
      setCartCount(response.numOfCartItems)
      setIsLoading(false)
    }

  }

  async function handleAddToCart(
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (!session) return;
    try {
      setAddToCartLoading(true)
      const data = await apiServices.addProductToCart(productId,session.token)
      setCartCount(data.numOfCartItems)
      toast.success(data.message)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Failed to add product")
      }
    } finally {
      setAddToCartLoading(false)
    }
  }
  

  useEffect(() => {
    getCart()
  }, [status])

  return (
    <cartContext.Provider
      value={{
        cartCount,
        setCartCount,
        isLoading,
        handleAddToCart,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

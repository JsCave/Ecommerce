"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components";
import { formatPrice } from "@/helpers/currency";
import CardProduct from '@/components/products/CardProduct';
import { GetUserCartResponse } from '@/interfaces';
import toast from 'react-hot-toast';
import { apiServices} from '@/services/api';
import { cartContext } from '@/contexts/cartContext';

interface InnerCartProps{
  cartData:GetUserCartResponse
}

export default function InnerCart({cartData}:InnerCartProps) {
  const [innerCartData,setInnerCartData]=useState<GetUserCartResponse>(cartData)
  const [isClearingCard,setisClearingCard]=useState(false)
  const [isCheckOutLoading,setIsCheckOutLoading]=useState(false)
const{setCartCount}=useContext(cartContext)!

useEffect(()=>{
  setCartCount!(innerCartData.numOfCartItems)
},[innerCartData])

 async function handleRemoveCartItem(
  productId:string,
  setIsRemovingProduct:(value:boolean)=>void){
  setIsRemovingProduct(true)
    const response=await apiServices.removeCartProduct(productId)
    toast.success('product removed successful',{
      position: 'bottom-center'
    })
    setIsRemovingProduct(false)
    const newCartData=await apiServices.getUserCart();
    setInnerCartData(newCartData)
  }

  async function handleClearCart(){
    setisClearingCard(true)
    const response=await apiServices.clearCart()
    toast.success('product removed successful',{
      position: 'bottom-center'
    })
    setisClearingCard(false)
    const newCartData=await apiServices.getUserCart();
    setInnerCartData(newCartData)
  }

  async function handleUpdateProductCartCount(productId:string,count:number){
    setisClearingCard(true)
    const response=await apiServices.updateCartProductCount(productId,count)
    toast.success('product Quantity Updated',{
      position: 'bottom-center'
    })
    setisClearingCard(false)
    const newCartData=await apiServices.getUserCart();
    setInnerCartData(newCartData)
  }

  async function handleCheckOut(){
    setIsCheckOutLoading(true)
    const response=await apiServices.checkOut(cartData.cartId)
    console.log(response.session.url)
    location.href=response.session.url
    setIsCheckOutLoading(false)
  }

  return (
    <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
{ innerCartData.numOfCartItems>0 &&  <p className="text-muted-foreground">
              {innerCartData.numOfCartItems} item
              {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
            </p>}
          </div>
    
          {innerCartData.numOfCartItems>0? <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {innerCartData.data.products.map((item) => (
    <CardProduct item={item} key={item._id} handleRemoveCartItem={handleRemoveCartItem} handleUpdateProductCartCount={handleUpdateProductCartCount}/>
                ))}
              </div>
    
              {/* Clear Cart */}
              <div className="mt-6">
                <Button variant="outline" onClick={handleClearCart} disabled={isClearingCard}>
                  {isClearingCard?<Loader2 className="animate-spin mr-2"/>:<Trash2 className="h-4 w-4 mr-2" />}
                  Clear Cart
                </Button>
              </div>
            </div>
    
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
    
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                    <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
    
                <hr className="my-4" />
    
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
    
                <Button disabled={isCheckOutLoading} onClick={handleCheckOut} className="w-full" size="lg">
                  {isCheckOutLoading && <Loader2 className='animate-spin'/>}
                  Proceed to Checkout
                </Button>
    
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
          :
        <div className='text-center'>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">No Products In Your Cart</h2>
        <Button variant="outline" className="w-fit mt-2" asChild>
                  <Link href="/products">Add Ones</Link>
                </Button>
        </div>
        }
    </>
  )
}

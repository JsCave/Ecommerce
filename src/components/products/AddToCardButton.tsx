import React from 'react'
import { Button } from '../ui'
import { Heart, Loader2, ShoppingCart } from 'lucide-react'

interface AddToCardButtonProps{
    productQuantity:number
    addToCartLoading:boolean
    handleAddToCart:()=>void
}

export default function AddToCardButton({productQuantity,addToCartLoading,handleAddToCart}:AddToCardButtonProps) {
  return (
    <Button onClick={handleAddToCart}
    size="lg"
    className="flex-1 w-full"
     disabled={productQuantity === 0 || addToCartLoading}
  >
    {addToCartLoading && <Loader2 className="animate-spin"/>}
    <ShoppingCart className="h-5 w-5 mr-2" />
    Add to Cart
  </Button>
  )
}

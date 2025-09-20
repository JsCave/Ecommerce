"use client";
import React from 'react'
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";
import { formatPrice } from "@/helpers/currency";
import {CartProduct as CartProductI, InnerCartProduct} from '@/interfaces'
import { apiServices } from '@/services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';



interface CardProductsProps {
  item: CartProductI<InnerCartProduct>;
  handleRemoveCartItem: (productId: string, setIsRemovingProduct: (value: boolean) => void) => void;
  handleUpdateProductCartCount:(productId:string,count:number)=>Promise<void>
}


export default function CardProduct({item,handleRemoveCartItem,handleUpdateProductCartCount}:CardProductsProps) {
const [isRemovingProduct,setIsRemovingProduct]=useState(false)
const [productCount,setProductCount]=useState(item.count)
const [timeOutId,setTimeOutId]=useState<NodeJS.Timeout>()




async function handleUpdateCount(count:number) {
 setProductCount(count)
 clearTimeout(timeOutId)
 const id=setTimeout(()=>{handleUpdateProductCartCount(item.product._id,count)},5000)
 setTimeOutId(id)
}

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
    <div className="relative w-20 h-20 flex-shrink-0">
      <Image
        src={item.product.imageCover}
        alt={item.product.title}
        fill
        className="object-cover rounded-md"
        sizes="80px"
      />
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="font-semibold line-clamp-2">
        <Link
          href={`/products/${item.product.id}`}
          className="hover:text-primary transition-colors"
        >
          {item.product.title}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground">
        {item.product.brand?.name}
      </p>
      <p className="font-semibold text-primary mt-2">
        {formatPrice(item.price)}
      </p>
    </div>

    <div className="flex flex-col items-end gap-2">
      <Button variant="ghost" size="sm" onClick={() => handleRemoveCartItem(item.product._id, setIsRemovingProduct)}>
        {isRemovingProduct?<Loader2 className="animate-spin"/> :<Trash2 className="h-4 w-4" />}
      </Button>

      <div className="flex items-center gap-2">
        <Button disabled={item.count==1} onClick={()=>handleUpdateCount(productCount-1)} variant="outline" size="sm">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{productCount}</span>
        <Button disabled={item.count==item.product.quantity} onClick={()=>handleUpdateCount(productCount+1)} variant="outline" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
  )
}

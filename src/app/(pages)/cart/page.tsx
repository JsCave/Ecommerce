import { apiServices } from '@/services/api'
import React from 'react'
import InnerCart from './InnerCart';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";




export default async function Cart() {
  const session = await getServerSession(authOptions);

   async function fetchCart(){
    if (!session) return;

        const response=await apiServices.getUserCart(session.token)
        return response
    }
    const response=await fetchCart()
    console.log(response)
    
    
  return (
    
    <div className="container mx-auto px-4 py-8">
<InnerCart cartData={response!}/>
    </div>

  )
}

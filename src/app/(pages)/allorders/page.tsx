"use client";
import { LoadingSpinner } from "@/components";
import { Order } from "@/interfaces";
import { apiServices } from "@/services/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
const {data: session,status}=useSession()



  async function getCartId() {
    if (!session) return;
    const  data  = await apiServices.getUserData(session.token)
    //console.log("cartId:", data);
    return data.decoded.id;
  }

  async function getOrders() {
    if(status=='authenticated'){
    setLoading(true)
    const cartId = await getCartId();
    const data: Order[] = await apiServices.getAllOrders(cartId!);
    console.log("Orders API result:", data);
    setOrders(data);
    setLoading(false)
    }
  }


  useEffect(() => {
    getOrders();
    console.log("Updated orders state:", orders);
  }, [status]);

  if (loading && orders.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order._id} className="border p-2 rounded">
              Order #{order.id} — Total: {order.totalOrderPrice} EGP
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

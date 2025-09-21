"use client";
import { LoadingSpinner } from "@/components";
import { Order } from "@/interfaces";
import { apiServices } from "@/services/api";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);


  async function getCartId() {
    const  data  = await apiServices.getUserData()
    console.log("cartId:", data);
   // return data.cartOwner;
  }

  async function getOrders() {
    const cartId = await getCartId();
   // const data: Order[] = await apiServices.getAllOrders(cartId);
   // console.log("Orders API result:", data);
  //  setOrders(data);*/
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    console.log("Updated orders state:", orders);
  }, [orders]);

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

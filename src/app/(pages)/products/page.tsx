"use client";

import { useState, useEffect } from "react";
import { Product, WishListResponse } from "@/interfaces";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";
import { ProductsResponse } from "@/types";
import { apiServices } from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishList,setWishList]= useState<Product[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

async function fetchProduct(){
  setLoading(true)
  const wishData:WishListResponse=await apiServices.getWishList()
  setWishList(wishData.data)
  const data:ProductsResponse=await apiServices.getAllProducts()
  setLoading(false)
  setProducts(data.data)
  console.log("Products:", data.data)
  console.log("Wishlist:", wishData.data)
}
useEffect(()=>{
  fetchProduct()
},[])

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

   <div className="flex justify-end mb-6 items-center ">
   <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
   </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
{products.map((product) => {
  const isInWishList = wishList.some((item) => item._id === product._id);

  return (
    <ProductCard
      key={product._id}
      product={product}
      viewMode={viewMode}
      isInWishList={isInWishList}
    />
  );
})}

      </div>
    </div>
  );
}

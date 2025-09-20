"use client";

import { useState, useEffect } from "react";
import { Brand } from "@/interfaces";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";
import { BrandsResponse } from "@/types";
import { apiServices } from "@/services/api";
import { BrandCard } from "@/components";
//https://ecommerce.routemisr.com/api/v1/brands

export default function page() {

      const [brands, setBrands] = useState<Brand[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    
    async function fetchBrand(){
      setLoading(true)
      const data:BrandsResponse=await apiServices.getAllBrands()
      setLoading(false)
      setBrands(data.data)
      console.log(data)
    }
    useEffect(()=>{
      fetchBrand()
    },[])

    if (loading && brands.length === 0) {
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
            <h1 className="text-3xl font-bold mb-4">Brands</h1>
            <p className="text-muted-foreground">
              Discover amazing Brands We Have
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
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} viewMode={viewMode} />
            ))}
          </div>
        </div>
      );
}

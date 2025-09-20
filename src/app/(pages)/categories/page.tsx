"use client";

import { useState, useEffect } from "react";
import { Category } from "@/interfaces";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";
import { BrandsResponse, CategoriesResponse } from "@/types";
import { apiServices } from "@/services/api";
import { BrandCard } from "@/components";
import { CategoryCard } from "@/components/categories";
//https://ecommerce.routemisr.com/api/v1/brands

export default function Page() {

      const [categories, setCategories] = useState<Category[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    
    async function fetchCategory(){
      setLoading(true)
      const data:CategoriesResponse=await apiServices.getAllCategories();
      setLoading(false)
      setCategories(data.data)
      console.log(data)
    }
    useEffect(()=>{
      fetchCategory()
    },[])

    if (loading && categories.length === 0) {
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
              Discover Categories we offer.
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
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} viewMode={viewMode} />
            ))}
          </div>
        </div>
      );
}

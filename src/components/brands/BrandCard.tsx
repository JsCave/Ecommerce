"use client";

import Image from "next/image";
import Link from "next/link";
import { Brand} from "@/interfaces";




interface BrandCardProps {
  brand: Brand;
  viewMode?: "grid" | "list";
}

export function BrandCard({ brand, viewMode = "grid" }: BrandCardProps) {

  if (viewMode === "list") {
    return (
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={brand.image}
            alt={brand.name}
            width={500}
            height={500}
            className="object-cover rounded-md"
            sizes="128px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              <Link
                href={`/brands/${brand._id}`}
                className="hover:text-primary transition-colors"
              >
                {brand.slug}
              </Link>
            </h3>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {brand.slug}
          </p>

          </div>

      </div>
    );
  }

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={brand.image}
          alt={brand.name}
          width={500}
          height={500}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />


      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          <Link
            href={``}
            className="hover:text-primary hover:underline transition-colors"
          >
            {brand.name}
          </Link>
        </p>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/brands/${brand._id}`}>{brand.name}</Link>
        </h3>



      </div>
    </div>
  );
}

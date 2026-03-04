import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import type { ProductWithVendor } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithVendor;
  size?: "small" | "medium" | "large";
}

export default function ProductCard({ product, size = "medium" }: ProductCardProps) {
  const {
    id,
    name,
    description,
    price,
    vendor,
    imageUrl,
    certifications,
    location,
    rating,
    reviewCount,
  } = product;

  const cardClass = {
    small: "bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden",
    medium: "bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group",
    large: "bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group",
  }[size];

  const imageClass = {
    small: "w-full h-32 object-cover",
    medium: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300",
    large: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300",
  }[size];

  const contentPadding = {
    small: "p-4",
    medium: "p-6",
    large: "p-6",
  }[size];

  return (
    <div className={cardClass}>
      <div className="relative">
        <img
          src={imageUrl || "/placeholder-product.jpg"}
          alt={name}
          className={imageClass}
        />
        <div className="absolute top-4 left-4">
          {certifications && certifications.length > 0 && (
            <Badge className="bg-regen-forest text-white">
              {certifications[0]}
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white text-earth-dark rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={contentPadding}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-regen-forest font-medium">
            {vendor.name}
          </span>
          {rating && (
            <div className="flex items-center text-regen-orange">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm ml-1">{rating}</span>
            </div>
          )}
        </div>

        <h4 className="font-semibold text-earth-dark mb-2 line-clamp-2">
          {name}
        </h4>

        <p className="text-earth-medium text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-earth-dark">
              ${price}
            </span>
          </div>
          <Link href={`/product/${id}`}>
            <Button
              size="sm"
              className="bg-regen-teal hover:bg-regen-forest text-white"
            >
              {size === "small" ? "View" : "View Product"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

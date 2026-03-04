import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, MapPin, Award, Leaf, Heart, ExternalLink } from "lucide-react";
import ProductCard from "@/components/product-card";
import type { ProductWithVendor } from "@shared/schema";

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery<ProductWithVendor>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const { data: relatedProducts = [] } = useQuery<ProductWithVendor[]>({
    queryKey: ["/api/products", { vendorId: product?.vendorId }],
    enabled: !!product?.vendorId,
    select: (data) => data.filter(p => p.id !== id).slice(0, 3),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-dark mb-4">Product Not Found</h1>
          <Link href="/directory">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <Link href="/directory" className="inline-flex items-center text-regen-teal hover:text-regen-forest mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.imageUrl || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
          <div className="absolute top-4 left-4">
            {product.certifications && product.certifications.length > 0 && (
              <Badge className="bg-regen-forest text-white">
                {product.certifications[0]}
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white text-earth-dark rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Link
              href={`/directory?vendorId=${product.vendor.id}`}
              className="text-regen-forest hover:text-regen-teal font-medium"
            >
              {product.vendor.name}
            </Link>
            <h1 className="text-3xl font-bold text-earth-dark mt-2 mb-4">
              {product.name}
            </h1>
            
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(parseFloat(product.rating!))
                          ? "text-regen-orange fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold ml-2">{product.rating}</span>
                <span className="text-earth-medium ml-2">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <div className="text-3xl font-bold text-earth-dark mb-6">
              ${product.price}
            </div>

            <p className="text-earth-medium text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div>
              <h3 className="font-semibold text-earth-dark mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Practices */}
          {product.practices && (
            <div>
              <h3 className="font-semibold text-earth-dark mb-3 flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                Regenerative Practices
              </h3>
              <p className="text-earth-medium">{product.practices}</p>
            </div>
          )}

          {/* Location */}
          {product.location && (
            <div>
              <h3 className="font-semibold text-earth-dark mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Origin
              </h3>
              <p className="text-earth-medium">{product.location}</p>
            </div>
          )}

          <Button
            size="lg"
            className="w-full bg-regen-teal hover:bg-regen-forest text-white"
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? "Contact Vendor" : "Currently Unavailable"}
          </Button>
        </div>
      </div>

      {/* Vendor Information */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>About {product.vendor.name}</span>
            {product.vendor.website && (
              <a
                href={product.vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-regen-teal hover:text-regen-forest"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-earth-medium mb-4">{product.vendor.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-earth-dark mb-2">Location</h4>
              <p className="text-earth-medium">{product.vendor.location}</p>
            </div>
            
            {product.vendor.practices && (
              <div>
                <h4 className="font-semibold text-earth-dark mb-2">Practices</h4>
                <p className="text-earth-medium">{product.vendor.practices}</p>
              </div>
            )}
          </div>

          {product.vendor.certifications && product.vendor.certifications.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-earth-dark mb-2">Vendor Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {product.vendor.certifications.map((cert) => (
                  <Badge key={cert} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-earth-dark mb-6">
            More from {product.vendor.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

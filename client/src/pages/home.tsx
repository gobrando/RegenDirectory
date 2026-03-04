import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CategoryGrid from "@/components/category-grid";
import ProductCard from "@/components/product-card";
import type { ProductWithVendor } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts = [] } = useQuery<ProductWithVendor[]>({
    queryKey: ["/api/products"],
    select: (data) => data.slice(0, 3), // Get first 3 products as featured
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(22, 160, 133, 0.7), rgba(39, 174, 96, 0.7)), url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">
                Discover Regenerative Products That Heal Our Planet
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connect with verified regenerative organic products and support brands that restore soil health, sequester carbon, and build resilient ecosystems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/directory">
                  <Button
                    size="lg"
                    className="bg-regen-orange hover:bg-regen-carrot text-white font-semibold"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-regen-forest font-semibold"
                  >
                    Learn About Regenerative
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-earth-medium max-w-2xl mx-auto">
              Discover regenerative products across all aspects of sustainable living
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-regen-forest/5 to-regen-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Featured Regenerative Products
            </h2>
            <p className="text-lg text-earth-medium max-w-2xl mx-auto">
              Handpicked products from verified regenerative brands making a positive impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} size="large" />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/directory">
              <Button
                size="lg"
                className="bg-regen-forest hover:bg-earth-dark text-white font-semibold"
              >
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-gradient-to-br from-regen-teal/10 to-regen-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Learn About Regenerative Agriculture
            </h2>
            <p className="text-lg text-earth-medium max-w-3xl mx-auto">
              Discover how regenerative practices are healing our planet, one farm at a time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Healthy soil ecosystem"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-earth-dark mb-3">
                  Soil Health Revolution
                </h3>
                <p className="text-earth-medium mb-4">
                  Learn how regenerative practices build living soil that sequesters carbon, improves water retention, and increases biodiversity.
                </p>
                <Link
                  href="/learn#soil-health"
                  className="text-regen-teal hover:text-regen-forest font-semibold flex items-center"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Regenerative farming practices"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-earth-dark mb-3">
                  Carbon Sequestration
                </h3>
                <p className="text-earth-medium mb-4">
                  Discover how regenerative agriculture can help reverse climate change by pulling carbon from the atmosphere into the soil.
                </p>
                <Link
                  href="/learn#carbon"
                  className="text-regen-teal hover:text-regen-forest font-semibold flex items-center"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Biodiverse farm landscape"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-earth-dark mb-3">
                  Biodiversity Benefits
                </h3>
                <p className="text-earth-medium mb-4">
                  Explore how diverse farming systems support wildlife, pollinators, and create resilient agricultural ecosystems.
                </p>
                <Link
                  href="/learn#biodiversity"
                  className="text-regen-teal hover:text-regen-forest font-semibold flex items-center"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-16 bg-regen-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Are You a Regenerative Brand?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our directory and connect with conscious consumers who value regenerative practices. Share your story and grow your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vendor-apply">
                <Button
                  size="lg"
                  className="bg-regen-orange hover:bg-regen-carrot text-white font-semibold"
                >
                  Apply as Vendor
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-regen-forest font-semibold"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

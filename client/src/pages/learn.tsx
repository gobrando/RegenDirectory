import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Learn() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-regen-teal/10 to-regen-forest/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-earth-dark mb-6">
              Learn About Regenerative Agriculture
            </h1>
            <p className="text-xl text-earth-medium">
              Discover how regenerative practices are healing our planet, restoring ecosystems, and building a sustainable future for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* What is Regenerative Agriculture */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-earth-dark mb-6">
                What is Regenerative Agriculture?
              </h2>
              <p className="text-lg text-earth-medium mb-6">
                Regenerative agriculture is a farming approach that focuses on rebuilding soil health, increasing biodiversity, improving water retention, and sequestering carbon. Unlike conventional farming that often depletes the land, regenerative practices work with nature to restore and enhance ecosystems.
              </p>
              <p className="text-lg text-earth-medium mb-8">
                This holistic approach considers the entire farm ecosystem, from soil microorganisms to wildlife habitats, creating resilient agricultural systems that can adapt to climate change while producing nutritious food.
              </p>
              <Link href="/directory">
                <Button className="bg-regen-teal hover:bg-regen-forest text-white">
                  Shop Regenerative Products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Healthy soil ecosystem with diverse plant life"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section id="principles" className="py-16 bg-earth-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Key Principles of Regenerative Agriculture
            </h2>
            <p className="text-lg text-earth-medium max-w-3xl mx-auto">
              These fundamental principles guide regenerative farmers in creating sustainable, resilient agricultural systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">1. Minimize Soil Disturbance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Reduce tillage and other practices that disturb soil structure, preserving soil biology and preventing erosion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">2. Maximize Crop Diversity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Plant diverse crops and varieties to support soil health, reduce pest pressure, and increase ecosystem resilience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">3. Keep Soil Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Use cover crops, mulch, and other methods to protect soil from erosion and temperature extremes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">4. Maintain Living Roots</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Keep living roots in the soil year-round to feed soil microorganisms and build soil carbon.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">5. Integrate Livestock</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Use managed grazing to mimic natural ecosystems and cycle nutrients back into the soil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">6. Context-Based Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium">
                  Adapt practices to local climate, soil, and ecosystem conditions for optimal results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Benefits of Regenerative Agriculture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div id="soil-health" className="bg-gradient-to-br from-regen-teal/10 to-regen-forest/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-earth-dark mb-4">Soil Health Revolution</h3>
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Healthy soil with diverse organisms"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-earth-medium mb-4">
                Regenerative practices build living soil rich in organic matter, beneficial microorganisms, and nutrients. This leads to improved soil structure, better water retention, and increased fertility.
              </p>
              <ul className="text-sm text-earth-medium space-y-2">
                <li>• Increased soil organic matter</li>
                <li>• Enhanced microbial diversity</li>
                <li>• Better water infiltration and retention</li>
                <li>• Reduced need for synthetic inputs</li>
              </ul>
            </div>

            <div id="carbon" className="bg-gradient-to-br from-regen-orange/10 to-regen-carrot/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-earth-dark mb-4">Carbon Sequestration</h3>
              <img
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Farmer practicing sustainable techniques"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-earth-medium mb-4">
                Regenerative agriculture actively removes carbon dioxide from the atmosphere and stores it in soil organic matter, helping to mitigate climate change.
              </p>
              <ul className="text-sm text-earth-medium space-y-2">
                <li>• Captures atmospheric CO2</li>
                <li>• Stores carbon in soil long-term</li>
                <li>• Reduces greenhouse gas emissions</li>
                <li>• Creates carbon-negative farming systems</li>
              </ul>
            </div>

            <div id="biodiversity" className="bg-gradient-to-br from-regen-brown/10 to-regen-tan/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-earth-dark mb-4">Biodiversity Enhancement</h3>
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Diverse farm ecosystem"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-earth-medium mb-4">
                Diverse farming systems support a wide range of plants, animals, and microorganisms, creating resilient ecosystems that can adapt to environmental changes.
              </p>
              <ul className="text-sm text-earth-medium space-y-2">
                <li>• Supports pollinator populations</li>
                <li>• Creates wildlife habitat</li>
                <li>• Increases plant and animal diversity</li>
                <li>• Builds ecosystem resilience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 bg-earth-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-dark mb-4">
              Regenerative Certifications
            </h2>
            <p className="text-lg text-earth-medium max-w-3xl mx-auto">
              These certifications help consumers identify products that meet rigorous regenerative standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">Regenerative Organic Certified (ROC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  The highest standard for regenerative agriculture, requiring soil health, animal welfare, and social fairness practices.
                </p>
                <p className="text-sm text-earth-medium">
                  Standards include cover cropping, composting, holistic management, and fair labor practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">USDA Organic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  Prohibits synthetic pesticides and fertilizers, often serving as a foundation for regenerative practices.
                </p>
                <p className="text-sm text-earth-medium">
                  Many regenerative farmers build upon organic certification with additional soil health practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">Carbon Negative Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  Verifies that farming practices remove more carbon from the atmosphere than they emit.
                </p>
                <p className="text-sm text-earth-medium">
                  Requires measurement and verification of carbon sequestration through soil testing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">B Corp Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  Certifies companies that meet high standards of social and environmental performance.
                </p>
                <p className="text-sm text-earth-medium">
                  Includes consideration of supply chain practices and environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">Certified Naturally Grown</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  Grassroots alternative to organic certification, emphasizing natural farming methods.
                </p>
                <p className="text-sm text-earth-medium">
                  Peer-review system focused on biodiversity and soil health improvement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-regen-forest">Soil Health Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-medium mb-4">
                  Measures and verifies improvements in soil health metrics over time.
                </p>
                <p className="text-sm text-earth-medium">
                  Tracks soil organic matter, microbial activity, and carbon sequestration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-regen-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Support Regenerative Agriculture Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Every purchase of regenerative products helps heal our planet and supports farmers who are building a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/directory">
                <Button
                  size="lg"
                  className="bg-regen-orange hover:bg-regen-carrot text-white font-semibold"
                >
                  Shop Regenerative Products
                </Button>
              </Link>
              <Link href="/vendor-apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-regen-forest font-semibold"
                >
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    category?: string;
    search?: string;
    location?: string;
    certifications?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) => void;
  initialFilters?: {
    category?: string;
    search?: string;
    location?: string;
    certifications?: string[];
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function ProductFilters({ onFiltersChange, initialFilters = {} }: ProductFiltersProps) {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || "all");
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.location || "all");
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>(
    initialFilters.certifications || []
  );
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || "");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const availableCertifications = [
    "Regenerative Organic Certified",
    "USDA Organic",
    "B Corp Certified",
    "Carbon Negative",
    "Certified Naturally Grown",
    "EPA Safer Choice",
    "Leaping Bunny",
    "Cradle to Cradle",
  ];

  const handleCertificationChange = (certification: string, checked: boolean) => {
    let newCertifications;
    if (checked) {
      newCertifications = [...selectedCertifications, certification];
    } else {
      newCertifications = selectedCertifications.filter(c => c !== certification);
    }
    setSelectedCertifications(newCertifications);
  };

  const applyFilters = () => {
    const filters = {
      search: search || undefined,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      location: selectedLocation !== "all" ? selectedLocation : undefined,
      certifications: selectedCertifications.length > 0 ? selectedCertifications : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
    );

    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedCertifications([]);
    setMinPrice("");
    setMaxPrice("");
    onFiltersChange({});
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-earth-dark">
          Filter Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="font-semibold text-earth-dark mb-3">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2"
          />
        </div>

        {/* Category Filter */}
        <div>
          <Label className="font-semibold text-earth-dark mb-3">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Certification Filter */}
        <div>
          <Label className="font-semibold text-earth-dark mb-3">Certifications</Label>
          <div className="space-y-2 mt-2">
            {availableCertifications.slice(0, 5).map((certification) => (
              <div key={certification} className="flex items-center space-x-2">
                <Checkbox
                  id={certification}
                  checked={selectedCertifications.includes(certification)}
                  onCheckedChange={(checked) =>
                    handleCertificationChange(certification, checked as boolean)
                  }
                />
                <Label
                  htmlFor={certification}
                  className="text-sm text-earth-medium cursor-pointer"
                >
                  {certification}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <Label className="font-semibold text-earth-dark mb-3">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="California">California</SelectItem>
              <SelectItem value="Oregon">Oregon</SelectItem>
              <SelectItem value="Washington">Washington</SelectItem>
              <SelectItem value="Vermont">Vermont</SelectItem>
              <SelectItem value="North Carolina">North Carolina</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="font-semibold text-earth-dark mb-3">Price Range</Label>
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={applyFilters}
            className="w-full bg-regen-teal hover:bg-regen-forest text-white"
          >
            Apply Filters
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { type Product, type InsertProduct, type Vendor, type InsertVendor, type Category, type InsertCategory, type ProductWithVendor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(filters?: {
    category?: string;
    search?: string;
    location?: string;
    certifications?: string[];
    minPrice?: number;
    maxPrice?: number;
    vendorId?: string;
  }): Promise<ProductWithVendor[]>;
  getProduct(id: string): Promise<ProductWithVendor | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Vendors
  getVendors(): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private vendors: Map<string, Vendor>;
  private categories: Map<string, Category>;

  constructor() {
    this.products = new Map();
    this.vendors = new Map();
    this.categories = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categories = [
      { name: "Food & Beverages", slug: "food-beverages", icon: "fas fa-apple-alt", description: "Organic and regenerative food products" },
      { name: "Personal Care", slug: "personal-care", icon: "fas fa-spa", description: "Natural skincare and body care" },
      { name: "Household", slug: "household", icon: "fas fa-home", description: "Eco-friendly cleaning and home products" },
      { name: "Clothing", slug: "clothing", icon: "fas fa-tshirt", description: "Sustainable and ethical fashion" },
      { name: "Garden & Farm", slug: "garden-farm", icon: "fas fa-seedling", description: "Tools and supplies for regenerative growing" },
      { name: "Pet Care", slug: "pet-care", icon: "fas fa-paw", description: "Natural pet food and care products" },
    ];
    
    categories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    // Seed vendors
    const vendors = [
      { 
        name: "GreenHarvest Farms", 
        description: "Family-owned farm committed to regenerative agriculture and soil health",
        website: "https://greenharvest.com",
        location: "California, USA",
        certifications: ["Regenerative Organic Certified", "USDA Organic"],
        practices: "Cover cropping, rotational grazing, composting",
        contactEmail: "contact@greenharvest.com",
        isVerified: true
      },
      { 
        name: "Pure Earth Co.", 
        description: "Sustainable skincare made with regeneratively sourced botanicals",
        website: "https://pureearthco.com",
        location: "Oregon, USA",
        certifications: ["B Corp Certified", "Leaping Bunny"],
        practices: "Wild harvesting, direct trade, zero waste packaging",
        contactEmail: "hello@pureearthco.com",
        isVerified: true
      },
      { 
        name: "BeeKind Apiaries", 
        description: "Ethical beekeeping supporting native pollinator populations",
        website: "https://beekind.com",
        location: "Vermont, USA",
        certifications: ["Certified Naturally Grown"],
        practices: "Chemical-free hives, wildflower meadows, bee sanctuary",
        contactEmail: "info@beekind.com",
        isVerified: true
      },
      { 
        name: "Heritage Greens", 
        description: "Heirloom vegetables grown with regenerative techniques",
        website: "https://heritagegreens.com",
        location: "North Carolina, USA",
        certifications: ["Regenerative Organic Certified"],
        practices: "Soil building, biodiversity enhancement, carbon sequestration",
        contactEmail: "growers@heritagegreens.com",
        isVerified: true
      },
      { 
        name: "EcoClean Co.", 
        description: "Plant-based cleaning products in refillable packaging",
        website: "https://ecocleanco.com",
        location: "Washington, USA",
        certifications: ["EPA Safer Choice", "Cradle to Cradle"],
        practices: "Circular economy, renewable ingredients, plastic-free",
        contactEmail: "support@ecocleanco.com",
        isVerified: true
      },
    ];

    vendors.forEach(vendor => {
      const id = randomUUID();
      this.vendors.set(id, { ...vendor, id });
    });

    // Get category and vendor IDs for products
    const foodCat = Array.from(this.categories.values()).find(c => c.slug === "food-beverages")!;
    const personalCareCat = Array.from(this.categories.values()).find(c => c.slug === "personal-care")!;
    const householdCat = Array.from(this.categories.values()).find(c => c.slug === "household")!;
    const gardenCat = Array.from(this.categories.values()).find(c => c.slug === "garden-farm")!;

    const greenHarvestVendor = Array.from(this.vendors.values()).find(v => v.name === "GreenHarvest Farms")!;
    const pureEarthVendor = Array.from(this.vendors.values()).find(v => v.name === "Pure Earth Co.")!;
    const beeKindVendor = Array.from(this.vendors.values()).find(v => v.name === "BeeKind Apiaries")!;
    const heritageVendor = Array.from(this.vendors.values()).find(v => v.name === "Heritage Greens")!;
    const ecoCleanVendor = Array.from(this.vendors.values()).find(v => v.name === "EcoClean Co.")!;

    // Seed products
    const products = [
      {
        name: "Organic Seasonal Vegetable Box",
        description: "Farm-fresh seasonal vegetables grown using regenerative practices that restore soil health and biodiversity.",
        price: "34.99",
        vendorId: greenHarvestVendor.id,
        categoryId: foodCat.id,
        imageUrl: "https://images.unsplash.com/photo-1506976773555-b3da30a63b57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        certifications: ["Regenerative Organic Certified"],
        practices: "Cover cropping, composting, beneficial insects",
        location: "California, USA",
        rating: "4.9",
        reviewCount: 127,
        isAvailable: true
      },
      {
        name: "Regenerative Skincare Set",
        description: "Handcrafted skincare made with regeneratively sourced botanicals that nourish your skin and the earth.",
        price: "48.00",
        vendorId: pureEarthVendor.id,
        categoryId: personalCareCat.id,
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        certifications: ["B Corp Certified", "Leaping Bunny"],
        practices: "Wild harvesting, direct trade partnerships",
        location: "Oregon, USA",
        rating: "4.8",
        reviewCount: 89,
        isAvailable: true
      },
      {
        name: "Raw Wildflower Honey",
        description: "Unprocessed honey from regenerative wildflower meadows that support native pollinators.",
        price: "12.99",
        vendorId: beeKindVendor.id,
        categoryId: foodCat.id,
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        certifications: ["Certified Naturally Grown"],
        practices: "Chemical-free hives, native plant restoration",
        location: "Vermont, USA",
        rating: "4.9",
        reviewCount: 203,
        isAvailable: true
      },
      {
        name: "Organic Salad Mix",
        description: "Fresh mixed greens grown using cover crops and holistic management practices.",
        price: "8.50",
        vendorId: heritageVendor.id,
        categoryId: foodCat.id,
        imageUrl: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        certifications: ["Regenerative Organic Certified"],
        practices: "Soil building, biodiversity enhancement",
        location: "North Carolina, USA",
        rating: "4.8",
        reviewCount: 156,
        isAvailable: true
      },
      {
        name: "Natural All-Purpose Cleaner",
        description: "Plant-based cleaner in refillable glass bottles. Safe for families and the environment.",
        price: "15.99",
        vendorId: ecoCleanVendor.id,
        categoryId: householdCat.id,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        certifications: ["EPA Safer Choice"],
        practices: "Circular economy, renewable ingredients",
        location: "Washington, USA",
        rating: "4.7",
        reviewCount: 94,
        isAvailable: true
      },
      {
        name: "Carbon-Sequestering Compost",
        description: "Premium compost that enhances soil biology and actively sequesters carbon in your garden.",
        price: "22.50",
        vendorId: greenHarvestVendor.id,
        categoryId: gardenCat.id,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        certifications: ["Regenerative Organic Certified"],
        practices: "Soil building, carbon sequestration",
        location: "California, USA",
        rating: "4.7",
        reviewCount: 67,
        isAvailable: true
      },
    ];

    products.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(filters?: {
    category?: string;
    search?: string;
    location?: string;
    certifications?: string[];
    minPrice?: number;
    maxPrice?: number;
    vendorId?: string;
  }): Promise<ProductWithVendor[]> {
    let filteredProducts = Array.from(this.products.values());

    if (filters) {
      if (filters.category) {
        const category = Array.from(this.categories.values()).find(c => c.slug === filters.category);
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.categoryId === category.id);
        }
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters.location) {
        filteredProducts = filteredProducts.filter(p =>
          p.location?.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.certifications?.length) {
        filteredProducts = filteredProducts.filter(p =>
          filters.certifications!.some(cert => p.certifications?.includes(cert))
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => parseFloat(p.price) >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => parseFloat(p.price) <= filters.maxPrice!);
      }

      if (filters.vendorId) {
        filteredProducts = filteredProducts.filter(p => p.vendorId === filters.vendorId);
      }
    }

    return filteredProducts.map(product => ({
      ...product,
      vendor: this.vendors.get(product.vendorId)!,
      category: this.categories.get(product.categoryId)!,
    }));
  }

  async getProduct(id: string): Promise<ProductWithVendor | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    return {
      ...product,
      vendor: this.vendors.get(product.vendorId)!,
      category: this.categories.get(product.categoryId)!,
    };
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id, rating: null, reviewCount: 0 };
    this.products.set(id, product);
    return product;
  }

  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = randomUUID();
    const vendor: Vendor = { ...insertVendor, id, isVerified: false };
    this.vendors.set(id, vendor);
    return vendor;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();

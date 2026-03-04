import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVendorSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";
import Parser from "rss-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string,
        search: req.query.search as string,
        location: req.query.location as string,
        certifications: req.query.certifications ? 
          (Array.isArray(req.query.certifications) ? req.query.certifications as string[] : [req.query.certifications as string]) : 
          undefined,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        vendorId: req.query.vendorId as string,
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => 
        filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
      );

      const products = await storage.getProducts(Object.keys(filters).length > 0 ? filters : undefined);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const vendor = await storage.getVendor(req.params.id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const validatedData = insertVendorSchema.parse(req.body);
      const vendor = await storage.createVendor(validatedData);
      res.status(201).json(vendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // News - RSS feeds from regenerative agriculture sources
  const rssParser = new Parser({
    timeout: 10000,
    headers: {
      'User-Agent': 'RegenDirectory/1.0',
    },
  });

  interface NewsArticle {
    title: string;
    link: string;
    pubDate: string;
    snippet: string;
    source: string;
    sourceUrl: string;
    category: string;
    imageUrl: string | null;
  }

  let newsCache: { articles: NewsArticle[]; timestamp: number } | null = null;
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  const NEWS_FEEDS = [
    {
      url: "https://news.google.com/rss/search?q=%22regenerative+agriculture%22+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Regenerative Agriculture",
      source: "Google News",
    },
    {
      url: "https://news.google.com/rss/search?q=%22regenerative+farming%22+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Regenerative Farming",
      source: "Google News",
    },
    {
      url: "https://news.google.com/rss/search?q=%22regenerative+organic%22+products+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Regenerative Products",
      source: "Google News",
    },
    {
      url: "https://news.google.com/rss/search?q=regenerative+food+brand+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Regenerative Brands",
      source: "Google News",
    },
    {
      url: "https://news.google.com/rss/search?q=%22soil+health%22+farming+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Soil Health",
      source: "Google News",
    },
    {
      url: "https://news.google.com/rss/search?q=%22carbon+sequestration%22+agriculture+when:7d&hl=en-US&gl=US&ceid=US:en",
      category: "Climate & Carbon",
      source: "Google News",
    },
  ];

  function extractSourceFromTitle(title: string): { cleanTitle: string; source: string } {
    const match = title.match(/^(.*)\s-\s([^-]+)$/);
    if (match) {
      return { cleanTitle: match[1].trim(), source: match[2].trim() };
    }
    return { cleanTitle: title, source: "Unknown" };
  }

  function extractImageFromContent(content: string | undefined): string | null {
    if (!content) return null;
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : null;
  }

  async function fetchAllNews(): Promise<NewsArticle[]> {
    if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
      return newsCache.articles;
    }

    const allArticles: NewsArticle[] = [];
    const seenLinks = new Set<string>();

    const feedPromises = NEWS_FEEDS.map(async (feedConfig) => {
      try {
        const feed = await rssParser.parseURL(feedConfig.url);
        return (feed.items || []).map((item) => {
          const { cleanTitle, source } = extractSourceFromTitle(item.title || "");
          return {
            title: cleanTitle,
            link: item.link || "",
            pubDate: item.pubDate || new Date().toISOString(),
            snippet: (item.contentSnippet || item.content || "").replace(/<[^>]*>/g, "").slice(0, 250),
            source,
            sourceUrl: item.link || "",
            category: feedConfig.category,
            imageUrl: extractImageFromContent(item.content || item["content:encoded"]),
          };
        });
      } catch (err) {
        console.error(`Failed to fetch feed: ${feedConfig.url}`, err);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    for (const articles of results) {
      for (const article of articles) {
        if (!seenLinks.has(article.link) && article.title) {
          seenLinks.add(article.link);
          allArticles.push(article);
        }
      }
    }

    allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    newsCache = { articles: allArticles, timestamp: Date.now() };
    return allArticles;
  }

  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      let articles = await fetchAllNews();

      if (category && category !== "all") {
        articles = articles.filter((a) => a.category === category);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const start = (page - 1) * limit;
      const paged = articles.slice(start, start + limit);

      res.json({
        articles: paged,
        total: articles.length,
        page,
        totalPages: Math.ceil(articles.length / limit),
        categories: [...new Set(NEWS_FEEDS.map((f) => f.category))],
      });
    } catch (error) {
      console.error("News fetch error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

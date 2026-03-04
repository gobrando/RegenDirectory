import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  website: text("website"),
  location: text("location"),
  certifications: jsonb("certifications").$type<string[]>().default([]),
  practices: text("practices"),
  contactEmail: text("contact_email"),
  isVerified: boolean("is_verified").default(false),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description"),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  vendorId: varchar("vendor_id").notNull(),
  categoryId: varchar("category_id").notNull(),
  imageUrl: text("image_url"),
  certifications: jsonb("certifications").$type<string[]>().default([]),
  practices: text("practices"),
  location: text("location"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  isAvailable: boolean("is_available").default(true),
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  isVerified: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  rating: true,
  reviewCount: true,
});

export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type ProductWithVendor = Product & {
  vendor: Vendor;
  category: Category;
};

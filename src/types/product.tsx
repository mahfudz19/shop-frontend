// src/types/product.ts

export interface Product {
  id: string;
  url: string;
  category: string[];
  clean_url: string;
  discount_percent: number;
  image_url: string;
  location: string;
  marketplace: string;
  marketplace_product_id: string;
  name: string;
  price_original: number;
  price_rp: number;
  rating: number;
  search_keyword: string;
  shop: string;
  sold_count: number;
  createdAt: Date;
  updatedAt: Date;
}

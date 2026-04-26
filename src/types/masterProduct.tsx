// src/types/product.ts

import { Product } from "./product";

export interface MasterProduct {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  brand: string;
  model: string;
  specifications: any;
  baseline_price_min: number;
  baseline_price_max: number;
  default_image: string;
  createdAt: Date;
  updatedAt: Date;
  offers: Product[];
  min_price: number;
  max_price: number;
  savings: number;
  total_offers: number;
}

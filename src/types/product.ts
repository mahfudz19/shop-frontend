// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  price_rp: number;
  shop: string;
  location: string;
  url: string;
  marketplace: string;
  createdAt: string;
  updatedAt: string;
}

// Sesuaikan dengan struct Pagination di Golang
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// Sesuaikan dengan struct MetaData di Golang
export interface MetaData {
  timestamp: string;
  request_id: string;
  pagination: PaginationData;
}

// Sesuaikan dengan struct BaseResponse di Golang
export interface ProductResponse {
  success: boolean;
  status: number;
  message: string;
  data: Product[];
  meta: MetaData;
}
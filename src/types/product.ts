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

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
}

export interface ProductResponse {
  status: string;
  message: string;
  data: Product[];
  meta: PaginationMeta;
}
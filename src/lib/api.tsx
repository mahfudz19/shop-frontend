import { ResponsePaginate, Response } from "@/types/respons";
import { Product } from "@/types/product";
import { Article } from "@/types/article";
import { Promotions } from "@/types/promotion";
import { Categories } from "@/types/categorie";
import { RegisterBody, UserAuth, UserAuthReg } from "@/types/user";

const BaseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_PROXY;

// ==========================================
// CENTRALIZED ERROR HANDLING
// ==========================================
export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "APIError";
  }
}

async function handleResponse<T>(res: globalThis.Response): Promise<T> {
  // Gunakan block try-catch pembantu berjaga-jaga jika backend mengembalikan body kosong (bukan JSON)
  let data: any = {};
  try {
    data = await res.json();
  } catch (err) {
    // Abaikan jika tidak bisa di-parse sebagai JSON
  }

  if (!res.ok) {
    const errorMessage =
      data.message || data.error || "Terjadi kesalahan pada server";
    throw new APIError(errorMessage, res.status);
  }

  return data as T;
}

// ==========================================
// API FUNCTIONS
// ==========================================

export async function register(
  body: RegisterBody,
): Promise<Response<UserAuthReg>> {
  const res = await fetch(`${BaseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<Response<UserAuthReg>>(res);
}

export async function login(
  email: string,
  password: string,
): Promise<Response<UserAuth>> {
  const res = await fetch(`${BaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse<Response<UserAuth>>(res);
}

export async function logout(): Promise<Response<any>> {
  const res = await fetch(`${BaseUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse<Response<any>>(res);
}

export async function fetchProducts(
  params: Record<string, string | number> = {},
): Promise<ResponsePaginate<Product>> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "")
      searchParams.append(key, String(value));
  });

  const url = `${BaseUrl}/products?${searchParams.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  return handleResponse<ResponsePaginate<Product>>(res);
}

export async function fetchCategories(): Promise<Response<Categories[]>> {
  const res = await fetch(`${BaseUrl}/categories`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<Response<Categories[]>>(res);
}

export async function fetchPromotions(): Promise<Response<Promotions[]>> {
  const res = await fetch(`${BaseUrl}/promotions?active=true`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<Response<Promotions[]>>(res);
}

export async function fetchArticles(): Promise<Response<Article[]>> {
  const res = await fetch(`${BaseUrl}/articles?published=true`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<Response<Article[]>>(res);
}

export async function fetchStats(): Promise<
  Response<{ total_products: number; total_shops: number }>
> {
  const res = await fetch(`${BaseUrl}/products/stats`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<
    Response<{ total_products: number; total_shops: number }>
  >(res);
}

export async function fetchDeals(): Promise<Response<Product[]>> {
  const res = await fetch(`${BaseUrl}/products/deals`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<Response<Product[]>>(res);
}

export async function fetchProductById(id: string): Promise<
  Response<{
    product: Product;
    master_info: {
      id: string;
      name: string;
      slug: string;
      brand: string;
      model: string;
      baseline_price_min: number;
      baseline_price_max: number;
      default_image: string;
    };
    related_offers: {
      id: string;
      master_product_id: string;
      url: string;
      category: string[];
      clean_url: string;
      createdAt: Date;
      discount_percent: number;
      image_url: string;
      is_anomaly: false;
      location: string;
      marketplace: string;
      marketplace_product_id: string;
      match_confidence: number;
      name: string;
      price_original: number;
      price_rp: number;
      rating: number;
      search_keyword: string;
      shop: string;
      sold_count: number;
      updatedAt: Date;
    }[];
  }>
> {
  const url = `${BaseUrl}/product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  // Membiarkan typescript meng-infer (menebak) secara otomatis karena tipe return function sudah sangat spesifik
  return handleResponse(res);
}

export async function fetchMasterProductById(
  id: string,
): Promise<Response<any>> {
  const url = `${BaseUrl}/master-product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  return handleResponse<Response<any>>(res);
}

export async function getMyData() {
  const url = `${BaseUrl}/user/my`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  return handleResponse<Response<any>>(res);
}

export async function getStatsAdmin() {
  const url = `${BaseUrl}/products-admin/stats`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  return handleResponse<Response<any>>(res);
}

export async function getMasterProductTest(id: string): Promise<Response<any>> {
  const url = `${BaseUrl}/master-product/${id}/test`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  return handleResponse<Response<any>>(res);
}

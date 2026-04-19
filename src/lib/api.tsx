import { ResponsePaginate, Response } from "@/types/respons";
import { Product } from "@/types/product";
import { Article } from "@/types/article";
import { Promotions } from "@/types/promotion";
import { Categories } from "@/types/categorie";
import { UserAuth } from "@/types/user";

const BaseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_PROXY;

export async function login(
  email: string,
  password: string,
): Promise<Response<UserAuth>> {
  const res = await fetch(`${BaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export async function logout(): Promise<Response<any>> {
  const res = await fetch(`${BaseUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
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

  return res.json();
}

export async function fetchCategories(): Promise<Response<Categories[]>> {
  const res = await fetch(`${BaseUrl}/categories`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function fetchPromotions(): Promise<Response<Promotions[]>> {
  const res = await fetch(`${BaseUrl}/promotions?active=true`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function fetchArticles(): Promise<Response<Article[]>> {
  const res = await fetch(`${BaseUrl}/articles?published=true`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function fetchStats(): Promise<
  Response<{ total_products: number; total_shops: number }>
> {
  const res = await fetch(`${BaseUrl}/products/stats`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function fetchDeals(): Promise<Response<Product[]>> {
  const res = await fetch(`${BaseUrl}/products/deals`, {
    next: { revalidate: 3600 },
  });
  return res.json();
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
      id: "69df279e842c3fff6b522002";
      master_product_id: "69e1234579f59b90601c0001";
      url: "https://tokopedia.com/sportjaya/bola-volley-volly-molten-v5m-5000-ori";
      category: string[];
      clean_url: string;
      createdAt: Date;
      discount_percent: 0;
      image_url: string;
      is_anomaly: false;
      location: string;
      marketplace: string;
      marketplace_product_id: string;
      match_confidence: 0.92;
      name: string;
      price_original: 750000;
      price_rp: 750000;
      rating: 4.8;
      search_keyword: string;
      shop: string;
      sold_count: 120;
      updatedAt: Date;
    }[];
  }>
> {
  const url = `${BaseUrl}/product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return res.json();
}

export async function fetchMasterProductById(
  id: string,
): Promise<Response<any>> {
  const url = `${BaseUrl}/master-product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return res.json();
}

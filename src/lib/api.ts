import { ResponsePaginate, Response } from "@/types/respons";
import { Product } from "@/types/product";
import { Article } from "@/types/articles";
import { Promotions } from "@/types/promotions";
import { Categories } from "@/types/categories";

const BaseUrl = typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_PROXY;

export async function fetchProducts(
  params: Record<string, string | number> = {}
): Promise<ResponsePaginate<Product>> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.append(key, String(value));
  });

  const url = `${BaseUrl}/products?${searchParams.toString()}`;

  const res = await fetch(url, {next: { revalidate: 60 }});

  return res.json();
}

export async function fetchCategories(): Promise<Response<Categories[]>> {
  const res = await fetch(`${BaseUrl}/categories`, { next: { revalidate: 3600 } });
  return res.json();
}

export async function fetchPromotions(): Promise<Response<Promotions[]>> {
  const res = await fetch(`${BaseUrl}/promotions?active=true`, { next: { revalidate: 3600 } });
  return res.json();
}

export async function fetchArticles(): Promise<Response<Article[]>> {
  const res = await fetch(`${BaseUrl}/articles?published=true`, { next: { revalidate: 3600 } });
  return res.json();
}

export async function fetchStats(): Promise<Response<{ total_products: number; total_shops: number }>> {
  const res = await fetch(`${BaseUrl}/products/stats`, { next: { revalidate: 3600 } });
  return res.json();
}

export async function fetchDeals(): Promise<Response<Product[]>> {
  const res = await fetch(`${BaseUrl}/products/deals`, { next: { revalidate: 3600 } });
  return res.json();
}
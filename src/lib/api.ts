import { ProductResponse } from "@/types/product";

export async function fetchProducts(
  params: Record<string, string | number> = {}
): Promise<ProductResponse> {
  // Bangun query string dari parameter
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  // 1. Deteksi apakah kode sedang dieksekusi di Server (Node.js) atau Client (Browser)
  const isServer = typeof window === "undefined";
  
  // 2. Tentukan Base URL secara dinamis
  const baseUrl = isServer ? "http://localhost:3000/api" : "/api";
  const url = `${baseUrl}/products?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
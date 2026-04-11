import { ProductResponse } from "@/types/product";

export async function fetchProducts(
  params: Record<string, string | number> = {}
): Promise<ProductResponse> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const isServer = typeof window === "undefined";
  
  const baseUrl = isServer 
    ? process.env.INTERNAL_API_URL 
    : process.env.NEXT_PUBLIC_API_PROXY;

  const url = `${baseUrl}/products?${searchParams.toString()}`;

  const res = await fetch(url, {
    // Revalidasi data setiap 60 detik (Incremental Static Regeneration)
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
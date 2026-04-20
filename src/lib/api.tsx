import { Article } from "@/types/article";
import { Categories } from "@/types/categorie";
import { Product } from "@/types/product";
import { Promotions } from "@/types/promotion";
import { Response, ResponsePaginate } from "@/types/respons";
import { RegisterBody, User, UserAuth, UserAuthReg } from "@/types/user";

const isServer = typeof window === "undefined";
const BaseUrl = isServer
  ? process.env.INTERNAL_API_URL
  : process.env.NEXT_PUBLIC_API_PROXY;

// ==========================================
// CENTRALIZED ERROR HANDLING
// ==========================================
export class APIError extends Error {
  status: number;
  url?: string;
  displayMessage: string;
  code?: string;
  details?: string;

  constructor(
    message: string,
    status: number,
    url?: string,
    code?: string,
    details?: string,
  ) {
    super(JSON.stringify({ message, status, url, code, details }));

    this.displayMessage = message;
    this.status = status;
    this.url = url;
    this.code = code;
    this.details = details;
    this.name = "APIError";
  }
}

async function handleResponse<T>(res: globalThis.Response): Promise<T> {
  let data: any = {};
  try {
    data = await res.json();
  } catch (err) {
    // Abaikan jika tidak bisa di-parse sebagai JSON
  }

  if (!res.ok) {
    // Jika backend mengirimkan data.error berupa object { code, details }
    const isErrorObject = typeof data.error === "object" && data.error !== null;

    let errorMessage = data.message || "Terjadi kesalahan pada server";
    // Fallback jika API sebelumnya mengirim string di data.error dan tidak ada message
    if (!data.message && typeof data.error === "string") {
      errorMessage = data.error;
    }

    const code = isErrorObject ? data.error.code : undefined;
    const details = isErrorObject ? data.error.details : undefined;

    throw new APIError(errorMessage, res.status, res.url, code, details);
  }

  return data as T;
}

// Fungsi Helper untuk memasang Cookie Token jika ada
function buildHeaders(
  token?: string,
  extraHeaders: HeadersInit = {},
): HeadersInit {
  const headers: Record<string, string> = { ...extraHeaders } as Record<
    string,
    string
  >;
  if (token) {
    headers["Cookie"] = `auth_token=${token}`;
  }
  return headers;
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

export async function getMyData(token?: string) {
  const url = `${BaseUrl}/auth/my`;
  const res = await fetch(url, {
    headers: buildHeaders(token),
    next: { revalidate: 60 },
  });
  return handleResponse<Response<User>>(res);
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

export async function fetchArticleBySlug(slug: string) {
  const res = await fetch(`${BaseUrl}/articles/slug/${slug}`, {
    next: { revalidate: 3600 },
  });
  return handleResponse<Response<Article>>(res);
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

export async function fetchProductById(id: string): Promise<Response<any>> {
  const url = `${BaseUrl}/product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return handleResponse(res);
}

export async function fetchMasterProductById(
  id: string,
): Promise<Response<any>> {
  const url = `${BaseUrl}/master-product/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  return handleResponse<Response<any>>(res);
}

// ==========================================
// PROTECTED API FUNCTIONS (Menerima parameter token)
// ==========================================

export async function getStatsAdmin(token?: string) {
  const url = `${BaseUrl}/products-admin/stats`;
  const res = await fetch(url, {
    headers: buildHeaders(token),
    next: { revalidate: 60 },
  });
  return handleResponse<
    Response<{
      active_deals: number;
      total_products: number;
      total_shops: number;
    }>
  >(res);
}

export async function getMasterProductTest(id: string, token?: string) {
  const url = `${BaseUrl}/master-product/${id}/test`;
  const res = await fetch(url, {
    headers: buildHeaders(token),
    next: { revalidate: 60 },
  });
  return handleResponse<Response<any>>(res);
}

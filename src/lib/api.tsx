import toast from "@/components/ui/Toast";
import { Article } from "@/types/article";
import { Categories } from "@/types/categorie";
import { MasterProduct } from "@/types/masterProduct";
import { Product } from "@/types/product";
import { Promotions } from "@/types/promotion";
import { PaginationQuery, Response, ResponsePaginate } from "@/types/respons";
import { RegisterBody, User, UserAuth, UserAuthReg } from "@/types/user";
import APIError from "./APIError";
import HttpClient from "./HttpClient";

export const toastError = (err: unknown) => {
  if (err instanceof APIError) {
    toast.error(err.details || err.displayMessage);
  } else if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};

function queryBuilder(params: Record<string, any> = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

const api = new HttpClient();

export async function register(body: RegisterBody) {
  return api.post<Response<UserAuthReg>>("/auth/register", body);
}

export async function login(email: string, password: string) {
  return api.post<Response<UserAuth>>("/auth/login", { email, password });
}

export async function logout() {
  return api.post<Response<any>>("/auth/logout");
}

export async function getMyData(token?: string) {
  return api.get<Response<User>>(
    "/auth/my",
    { next: { revalidate: 60 } },
    token,
  );
}

export async function fetchProducts(
  params: Record<string, string | number> = {},
) {
  return api.get<ResponsePaginate<Product>>(
    `/products?${queryBuilder(params)}`,
  );
}

export async function fetchCategories() {
  return api.get<Response<Categories[]>>("/categories");
}

export async function fetchPromotions() {
  return api.get<Response<Promotions[]>>("/promotions?active=true");
}

export async function fetchArticles() {
  return api.get<Response<Article[]>>("/articles?published=true");
}

export async function fetchArticleBySlug(slug: string) {
  return api.get<Response<Article>>(`/articles/slug/${slug}`);
}

export async function fetchStats() {
  type Type = { total_products: number; total_shops: number };
  return api.get<Response<Type>>("/products/stats");
}

export async function fetchDeals() {
  return api.get<Response<Product[]>>("/products/deals?limit=8");
}

export async function fetchProductById(id: string) {
  return api.get<Response<Product>>(`/product/${id}`, {
    next: { revalidate: 60 },
  });
}

export async function fetchMasterProductById(id: string) {
  return api.get<Response<MasterProduct>>(`/master-product/${id}`, {
    next: { revalidate: 60 },
  });
}

export async function getStatsAdmin(token?: string) {
  type StatsAdmin = {
    active_deals: number;
    total_products: number;
    total_shops: number;
  };
  return api.get<Response<StatsAdmin>>(
    "/products-admin/stats",
    { next: { revalidate: 60 } },
    token,
  );
}

export async function getMasterProductTest(id: string, token?: string) {
  return api.get<Response<any>>(
    `/master-product/${id}/test`,
    { next: { revalidate: 60 } },
    token,
  );
}

export async function getUsers(params: PaginationQuery, token?: string) {
  return api.get<ResponsePaginate<User>>(
    `/users?${queryBuilder(params)}`,
    undefined,
    token,
  );
}

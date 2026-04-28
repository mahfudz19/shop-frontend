import { forbidden, notFound, unauthorized } from "next/navigation";
import APIError from "./APIError";

export type FetchStrategy = "static" | "dynamic" | "admin" | "ssr";

export interface FetchConfig extends RequestInit {
  strategy?: FetchStrategy;
  revalidate?: number;
  tags?: string[];
}

class HttpClient {
  private baseUrl: string;
  private isServer: boolean;

  constructor() {
    this.isServer = typeof window === "undefined";
    this.baseUrl = this.isServer ? (process.env.INTERNAL_API_URL as string) : "/api";
  }

  private async handleResponse<T>(res: globalThis.Response): Promise<T> {
    let data: any = {};
    try {
      data = await res.json();
    } catch (err) {
      // Ignore if not JSON
    }

    if (!res.ok) {
      const isErrorObject = typeof data.error === "object" && data.error !== null;
      const errorMessage = data.message || "Terjadi kesalahan pada server";
      const code = isErrorObject ? data.error.code : undefined;
      const details = isErrorObject ? data.error.details : undefined;

      if (res.status === 401) unauthorized();
      if (res.status === 403) forbidden();
      if (res.status === 404) notFound();

      throw new APIError(errorMessage, res.status, res.url, code, details);
    }

    return data as T;
  }

  /**
   * ⚙️ Core Request Engine
   */
  public async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new Headers(options.headers || {});
    const method = (options.method || "GET").toUpperCase();
    const isMutative = ["POST", "PUT", "DELETE", "PATCH"].includes(method);

    if (!headers.has("Content-Type") && method !== "GET") {
      headers.set("Content-Type", "application/json");
    }

    if (isMutative) {
      headers.set("X-Requested-With", "XMLHttpRequest");
    }

    // Server-side specific headers
    if (this.isServer && token) {
      headers.set("Cookie", `auth_token=${token}`);
    }

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }

  /**
   * 🚀 Smart GET Method
   * Distinguishes between static, dynamic, and admin contexts
   */
  public get<T>(
    endpoint: string,
    config: FetchConfig = {},
    token?: string,
  ): Promise<T> {
    const { strategy, revalidate, tags, ...options } = config;

    // 🧠 Smart Strategy Detection
    // 1. If explicit admin strategy or path looks like admin CRUD, disable cache
    const isAdmin = strategy === "admin" || endpoint.includes("/users") || endpoint.includes("-admin");
    
    // 2. Determine revalidation settings
    const finalOptions: RequestInit = {
      ...options,
      method: "GET",
    };

    if (isAdmin || revalidate === 0) {
      finalOptions.cache = "no-store";
    } else {
      finalOptions.next = {
        revalidate: revalidate ?? (strategy === "static" ? 86400 : 3600),
        tags,
      };
    }

    return this.request<T>(endpoint, finalOptions, token);
  }

  /**
   * 🛠️ Mutative Methods (POST, PUT, PATCH, DELETE)
   * These never use the data cache by default
   */
  public post<T>(endpoint: string, data?: any, options?: RequestInit, token?: string): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "POST", body: data ? JSON.stringify(data) : undefined }, token);
  }

  public put<T>(endpoint: string, data?: any, options?: RequestInit, token?: string): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body: data ? JSON.stringify(data) : undefined }, token);
  }

  public patch<T>(endpoint: string, data?: any, options?: RequestInit, token?: string): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PATCH", body: data ? JSON.stringify(data) : undefined }, token);
  }

  public delete<T>(endpoint: string, options?: RequestInit, token?: string): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" }, token);
  }
}

export default HttpClient;

import { forbidden, notFound, unauthorized } from "next/navigation";
import APIError from "./APIError";

class HttpClient {
  private baseUrl: string;

  constructor() {
    const isServer = typeof window === "undefined";
    this.baseUrl = isServer ? (process.env.INTERNAL_API_URL as string) : "/api";
  }

  private async handleResponse<T>(res: globalThis.Response): Promise<T> {
    let data: any = {};
    try {
      data = await res.json();
    } catch (err) {
      // Abaikan jika bukan JSON
    }

    if (!res.ok) {
      const isErrorObject =
        typeof data.error === "object" && data.error !== null;
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

  // ⚙️ Mesin Utama (Base Request)
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

    if (token) {
      headers.set("Cookie", `auth_token=${token}`);
    }

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    return this.handleResponse<T>(res);
  }

  // 🚀 AXIOS-LIKE HELPER METHODS

  public get<T>(
    endpoint: string,
    options?: RequestInit,
    token?: string,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        next: {
          ...options?.next,
          revalidate: options?.next?.revalidate || 3600,
        },
        method: "GET",
      },
      token,
    );
  }

  public post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
    token?: string,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      token,
    );
  }

  public put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
    token?: string,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      token,
    );
  }

  public patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
    token?: string,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      token,
    );
  }

  public delete<T>(
    endpoint: string,
    options?: RequestInit,
    token?: string,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" }, token);
  }
}

export default HttpClient;

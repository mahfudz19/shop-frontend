import { UserAuth } from "@/types/user";
import { cookies } from "next/headers";

export function parseJwt(token: string) {
  try {
    // JWT terdiri dari 3 bagian yang dipisah titik: header.payload.signature
    // Kita hanya butuh bagian kedua (payload)
    const base64Url = token.split(".")[1];
    // Ganti karakter Base64Url menjadi Base64 standar
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Decode dari Base64 ke String JSON
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  const decodedPayload = parseJwt(token);
  if (!decodedPayload || !decodedPayload.role) return null;
  return {
    user_id: decodedPayload.user_id as UserAuth["id"],
    email: decodedPayload.email as UserAuth["email"],
    role: decodedPayload.role as UserAuth["role"],
  };
}
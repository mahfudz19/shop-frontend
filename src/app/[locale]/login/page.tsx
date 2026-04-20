"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Ripple from "@/components/ui/Ripple";
import { PasswordField } from "../register/page";
import { login, APIError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof APIError) {
        setError(err.details || err.displayMessage);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-blue-600">
            Scrap<span className="text-gray-800">Store</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Masuk ke akun Anda</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="nama@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <PasswordField password={password} setPassword={setPassword} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            <Ripple />
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

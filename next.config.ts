import type { NextConfig } from "next";

/**
 * Membuat array remote patterns untuk Next.js Image
 * @returns Array of RemotePattern
 */
const getRemotePatterns = () => {
  const patterns: { protocol: "https"; hostname: string; port?: string; pathname?: string }[] = [
    { protocol: "https", hostname: "images.unsplash.com" },
  ];

  if (process.env.NEXT_IMAGES_HOSTNAME) {
    patterns.push({
      protocol: "https",
      hostname: process.env.NEXT_IMAGES_HOSTNAME.replace("https://", ""),
      pathname: "/**",
    });
  }

  return patterns;
};

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.INTERNAL_API_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: getRemotePatterns(),
  },
  env: {
    NEXT_PUBLIC_API_PROXY: process.env.NEXT_PUBLIC_API_PROXY,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_IMAGES_HOSTNAME: process.env.NEXT_IMAGES_HOSTNAME,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
  }
};

export default nextConfig;
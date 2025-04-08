import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: "/backend/:path*/",
        destination: `${process.env.BACKEND_URL}/:path*/`,
      },
    ];
  },
};

export default nextConfig;

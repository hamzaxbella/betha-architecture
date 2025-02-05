import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https" as const, // Explicitly asserting as "https"
        hostname: "cdn.sanity.io",
        port: "", // Empty string for no port
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;

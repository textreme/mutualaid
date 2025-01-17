import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables strict mode for React
  trailingSlash: true,  // Adds trailing slashes to all routes
  output: "export",     // Configures Next.js for static export
  images: {
    unoptimized: true,  // Required for static exports if using next/image
  },
};

export default nextConfig;

import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: true, // Enables React strict mode for debugging
  trailingSlash: true, // You can keep this if desired; it's not required for SSR or dynamic routing
};

export default nextConfig;

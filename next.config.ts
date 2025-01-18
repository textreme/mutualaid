import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true, // Ensures proper routing for static export
};

export default nextConfig;

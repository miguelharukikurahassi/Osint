import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Osint",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

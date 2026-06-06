import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // Consolidate www -> non-www so ranking signals are not split across
      // two hosts (Google has indexed both movifile.com and www.movifile.com).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.movifile.com" }],
        destination: "https://movifile.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:5000/api"}/:path*`,
      },
    ];
  },
};

export default nextConfig;

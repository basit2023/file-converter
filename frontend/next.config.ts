import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  serverExternalPackages: [
    "@adobe/pdfservices-node-sdk",
    "@napi-rs/canvas",
    "pdf-parse",
    "sharp",
  ],
  outputFileTracingIncludes: {
    "/api/convert": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
      "./node_modules/@napi-rs/canvas-linux-x64-gnu/**/*",
    ],
  },
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
};

export default nextConfig;

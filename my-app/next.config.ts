import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.icons8.com',
      },
      {
        hostname: 'example.com',
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
  serverExternalPackages: ['@pyroscope/nodejs']
};

export default nextConfig;

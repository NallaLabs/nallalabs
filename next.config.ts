import type { NextConfig } from "next";

// Matches academy.nallalabs.xyz in production and academy.localhost in development.
const academyHost = [{ type: "host" as const, value: "academy\\..+" }];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["academy.localhost"],
  async redirects() {
    return [
      {
        source: "/academy/:path*",
        has: [{ type: "host", value: "(www\\.)?nallalabs\\.xyz" }],
        destination: "https://academy.nallalabs.xyz/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles so "/" on the academy host wins over the main site's app/page.tsx.
      beforeFiles: [
        { source: "/", has: academyHost, destination: "/academy" },
        { source: "/week/:path*", has: academyHost, destination: "/academy/week/:path*" },
        { source: "/sitemap.xml", has: academyHost, destination: "/academy/sitemap.xml" },
        { source: "/robots.txt", has: academyHost, destination: "/academy/robots.txt" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

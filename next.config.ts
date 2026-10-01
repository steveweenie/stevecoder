import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75],
    remotePatterns: [
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },
      { protocol: "https", hostname: "lastfm-img.freetls.fastly.net" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.cloudflare.steamstatic.com" },
      { protocol: "https", hostname: "shared.akamai.steamstatic.com" },
    ],
  },
  // OG images read fonts and stills from /assets at runtime.
  outputFileTracingIncludes: {
    "/opengraph-image*": ["./assets/**/*"],
    "/levels/*": ["./assets/**/*"],
  },
};

export default nextConfig;

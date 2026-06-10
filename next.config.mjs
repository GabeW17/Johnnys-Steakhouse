/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Demo deploy: lint warnings shouldn't block the production build (types are still checked).
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

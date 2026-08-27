/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "bj6wwnp78shrv3zz.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.midjourney.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bj6wwnp78shrv3zz.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

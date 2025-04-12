/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    https: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

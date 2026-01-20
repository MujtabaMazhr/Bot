/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true, // 🚫 disables ESLint checks during build
  },
};

export default nextConfig;

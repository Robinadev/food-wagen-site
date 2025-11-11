/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to avoid double rendering issues
  swcMinify: true,
  images: {
    unoptimized: true, // Disable image optimization to avoid build issues
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore all TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore all ESLint errors
  },
  webpack: (config: { resolve: { fallback: any; }; }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
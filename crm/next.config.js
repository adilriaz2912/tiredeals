/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'tiredeals.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

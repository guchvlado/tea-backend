/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['moychay.ru', 'localhost', '37.110.132.109', 'tea-store-fullstack-production.up.railway.app']
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['moychay.ru', 'localhost']
  }
}

module.exports = nextConfig

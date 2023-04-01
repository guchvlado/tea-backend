/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['moychay.ru', 'localhost', '37.110.132.109']
  }
}

module.exports = nextConfig

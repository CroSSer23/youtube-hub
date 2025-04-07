/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/youtube-hub',
  assetPrefix: '/youtube-hub',
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  images: {
    unoptimized: true,
  },
  basePath: '/youtube-hub',
  assetPrefix: '/youtube-hub',
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig 
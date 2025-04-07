/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Настройка для GitHub Pages
  images: {
    unoptimized: true,
  },
  // Если репозиторий не на корневом домене, раскомментируйте и укажите имя репозитория
  // basePath: '/youtube-hub',
  // assetPrefix: '/youtube-hub',
  // Для экспорта статических файлов
  output: 'export',
  // Отключаем трассировку файлов изображений,
  // чтобы избежать ошибок при экспорте
  trailingSlash: true,
}

module.exports = nextConfig 
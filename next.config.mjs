// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Sama-Prj', 
  assetPrefix: '/Sama-Prj/', 
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
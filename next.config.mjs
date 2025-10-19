// next.config.mjs
/** @type {import('next').NextConfig} */

const isGithubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES;

const nextConfig = {
  trailingSlash: true,
  ...(isGithubPages && {
    output: 'export',
    basePath: '/Sama-Prj',
    assetPrefix: '/Sama-Prj/',
  }),
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
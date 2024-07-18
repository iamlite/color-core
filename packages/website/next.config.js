/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Configures allowed remote image sources
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '/iamlite/color-core/**'
      },
      {
        protocol: 'https',
        hostname: '*.github.com',
        pathname: '/iamlite/color-core/**'
      },
      {
        protocol: 'https',
        hostname: '*.color-core.com',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'docs.color-core.com'
          }
        ],
        destination: '/docs'
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'docs.color-core.com'
          }
        ],
        destination: '/docs/:path*'
      },
      {
        source: '/docs',
        destination: '/docs/index.html'
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*.html'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        port: '',
        pathname: '/iamlite/color-core/**'
      },
      {
        protocol: 'https',
        hostname: '*.github.com',
        port: '',
        pathname: '/iamlite/color-core/**'
      }
    ]
  }
}

module.exports = nextConfig

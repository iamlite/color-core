/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
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
        source: '/docs/:path*',
        destination: '/docs/:path*'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        has: [
          {
            type: 'host',
            value: 'color-core.com'
          }
        ],
        destination: 'https://docs.color-core.com',
        permanent: true
      },
      {
        source: '/docs/:path*',
        has: [
          {
            type: 'host',
            value: 'color-core.com'
          }
        ],
        destination: 'https://docs.color-core.com/:path*',
        permanent: true
      }
    ]
  },

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

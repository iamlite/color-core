/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Configures rewrites for the documentation
   * @returns {Promise<import('next/dist/lib/load-custom-routes').Rewrite[]>}
   */
  async rewrites() {
    return [
      // Serve docs from the public/docs directory on both main domain and subdomain
      {
        source: '/:path*',
        destination: '/docs/:path*'
      }
    ]
  },

  /**
   * Configures redirects for the documentation
   * @returns {Promise<import('next/dist/lib/load-custom-routes').Redirect[]>}
   */
  async redirects() {
    return [
      // Redirect /docs on main domain to docs subdomain
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
      // Redirect /docs/:path on main domain to docs subdomain
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/docs',
                destination: '/docs/index.html',
            },
            {
                source: '/docs/',
                destination: '/docs/index.html',
            },
            {
                source: '/docs/:path*',
                destination: '/docs/:path*',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/docs/:path*.html',
                destination: '/docs/:path*',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
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
        ];
    },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'http://api-silos-konsumer.basys.co.id/:path*',
        },
        ]
    },
}

module.exports = nextConfig

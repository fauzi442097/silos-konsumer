/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: 'https://api-silos-konsumer.basys.co.id/:path*',
            }
        ]
    }
}
module.exports = nextConfig

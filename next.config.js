/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.altan.ai',
      },
    ],
    domains: ['api.altan.ai'],
  }
};

module.exports = nextConfig; 
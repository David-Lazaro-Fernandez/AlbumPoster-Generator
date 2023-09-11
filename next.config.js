/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'scannables.scdn.co',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig

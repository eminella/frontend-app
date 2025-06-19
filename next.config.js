// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'backend-api-rvzd.onrender.com',  // API sunucundan çekiyorsan ekle
    ],
    // Next.js 14+ kullanıyorsan dilersen şöyle de tanımlayabilirsin:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     port: '',
    //     pathname: '/<your-cloud-name>/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'backend-api-rvzd.onrender.com',
    //     port: '',
    //     pathname: '/uploads/**',
    //   },
    // ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/store',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

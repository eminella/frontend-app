const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com', // <-- Bunu ekle!
      'res.cloudinary.com',
      'backend-api-rvzd.onrender.com'
    ],
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

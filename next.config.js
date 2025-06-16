/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },

  // Eğer daha önce rewrites eklediyseniz silebilir veya yanında bırakabilirsiniz.
  async redirects() {
    return [
      {
        source: "/",         // Ana path
        destination: "/store",// Yönlendirilecek path
        permanent: false,     // geçici yönlendirme (307)
      },
    ];
  },
};

module.exports = nextConfig;

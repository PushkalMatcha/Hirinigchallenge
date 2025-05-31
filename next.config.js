/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['robohash.org', 'api.dicebear.com', 'source.boringavatars.com'],
    // ✅ Next.js handles local images from /public automatically
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // During prototyping this avoids optimizer/network hiccups
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
module.exports = nextConfig;

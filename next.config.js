/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "firebasestorage.googleapis.com",
      "localhost",
      "www.upwork.com",
      "images.pexels.com",
      "encrypted-tbn0.gstatic.com",
      "media.istockphoto.com",
      "s.yimg.com",
      "via.placeholder.com",
      "example.com"
    ],
  },
};

module.exports = nextConfig;

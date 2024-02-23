/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-api.elice.io",
      },
    ],
  },
};

export default nextConfig;

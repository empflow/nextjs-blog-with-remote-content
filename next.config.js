/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/empflow/nextjs-blog-content/main/images/**",
      },
    ],
  },
};

module.exports = nextConfig;

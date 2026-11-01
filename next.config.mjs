/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/PaySure',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

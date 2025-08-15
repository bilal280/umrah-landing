/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/umrah-landing',
  assetPrefix: '/umrah-landing/',
  images: {
    unoptimized: true, // ضروري للـ export
  },
};

export default nextConfig;

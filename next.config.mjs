/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
 
  images: {
    unoptimized: true, // ضروري للـ export
  },
};

export default nextConfig;

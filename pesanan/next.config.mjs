/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    images: {
        domains: ["res.cloudinary.com"], // Tambahkan domain Cloudinary
      },  
      experimental: {
        serverActions: true, // Jika menggunakan Server Actions
      },
      eslint: {
        ignoreDuringBuilds: true, // Matikan ESLint saat build
      },
};

export default nextConfig;

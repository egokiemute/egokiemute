/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Global optimizer stays off. `CloudinaryImage` passes its own `loader`,
        // which still produces a real srcset. If this is ever flipped on, add
        // `remotePatterns` for `res.cloudinary.com`.
        unoptimized: true,
    },
};

export default nextConfig;

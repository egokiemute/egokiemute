/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: "/blog",
                destination: "/writings",
                permanent: true,
            },
            {
                source: "/blog/:slug",
                destination: "/writings/:slug",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;

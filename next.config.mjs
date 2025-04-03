/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['shaqportfoliostorage.blob.core.windows.net',
            'shaq-portfolio-webapp.s3.us-east-1.amazonaws.com'
        ], // Correct key here
    },
};

export default nextConfig;

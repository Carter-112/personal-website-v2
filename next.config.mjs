/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable server components for static export
  serverExternalPackages: [],
  // Ensure static paths are generated
  trailingSlash: true,
};

export default nextConfig;

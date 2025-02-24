/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@meshsdk/core", "@meshsdk/core-cst", "@meshsdk/react"],
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
   
    return config;
  },
  env: {
    NEXT_PUBLIC_REST_IPFS_GATEWAY: process.env.NEXT_PUBLIC_REST_IPFS_GATEWAY,
  },
};

export default nextConfig;
module.exports = nextConfig;

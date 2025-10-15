import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export configuration (enabled for production deployment)
  output: 'export',
  
  // Image optimization disabled (required for static sites)
  images: {
    unoptimized: true,
  },
  
  // Add trailing slash (optional)
  trailingSlash: true,
  
  // Base path configuration (if needed)
  // basePath: '',
  // assetPrefix: '',

  // Experimental features
  experimental: {
    // Enable only when needed
  },
}

module.exports = nextConfig;

// const nextConfig: NextConfig = {
//   /* config options here */

//   reactStrictMode: true,
// };

// export default nextConfig;

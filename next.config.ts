import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 393, 430, 540, 576, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384, 576],
    qualities: [75, 85],
    formats: ['image/avif', 'image/webp'],
    // 源图换名即换 URL，缓存可以放长；调试换图时临时改回 0
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;

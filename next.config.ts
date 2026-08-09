import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：所有图片尺寸在构建时已确定（见 scripts/optimize-images.mjs），
  // 不需要运行时图片优化，因此可部署到任意静态托管，
  // 不依赖平台是否实现了 next/image 的优化接口。
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

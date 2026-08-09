import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 本项目不使用 next/image：内容列宽度固定，所有尺寸在构建时
      // 由 scripts/optimize-images.mjs 预生成为 AVIF/WebP 多档 srcset，
      // 以便部署到不支持 next/image 优化接口的静态托管。
      // 见 src/components/Pic.tsx。
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

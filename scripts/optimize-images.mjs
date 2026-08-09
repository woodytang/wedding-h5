// 图片构建脚本：从 .masters/ 的 PNG 母版生成响应式图片到 public/img/。
//
// 为什么不用 next/image 的运行时优化：
// 内容列宽度固定为 max-w-[576px]，所有需要的尺寸在构建时就已知，
// 运行时优化器对本项目是多余的。预生成后可部署到任意静态托管，
// 不依赖平台是否支持 next/image。
//
// 尺寸档位对应 1x / 2x / 3x 屏：576 / 1152 / 1728。
//
// 母版不入库（见 .gitignore），产物 public/img/ 入库，
// 因此 CI 上不需要跑这个脚本。
//
// 用法：pnpm images:optimize

import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const mastersDir = path.join(root, '.masters')
const outputDir = path.join(root, 'public/img')

// 1x / 2x / 3x，对应 576 CSS px 的容器
const WIDTHS = [576, 1152, 1728]

// AVIF 体积更小但编码慢；WebP 作为兜底，覆盖老版本微信 X5 内核。
const FORMATS = [
  { ext: 'avif', encode: (p) => p.avif({ quality: 62, effort: 6 }) },
  { ext: 'webp', encode: (p) => p.webp({ quality: 86, effort: 6 }) },
]

function formatBytes(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)}MB`
    : `${(bytes / 1024).toFixed(0)}KB`
}

async function listMasters() {
  try {
    const entries = await readdir(mastersDir, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort()
  } catch {
    return []
  }
}

const masters = await listMasters()
if (masters.length === 0) {
  console.error(
    `没有在 ${path.relative(root, mastersDir)}/ 找到母版。\n` +
      '母版不入库，需要先放回该目录再运行。',
  )
  process.exit(1)
}

await mkdir(outputDir, { recursive: true })
console.log(`${masters.length} 个母版 → ${WIDTHS.join(' / ')} 三档 × ${FORMATS.length} 种格式\n`)

const manifest = []
let totalBytes = 0

for (const fileName of masters) {
  const baseName = path.basename(fileName, path.extname(fileName))
  const sourcePath = path.join(mastersDir, fileName)
  const metadata = await sharp(sourcePath).metadata()

  // 绝不放大：母版比某档还窄时，跳过该档。
  const widths = WIDTHS.filter((width) => width <= metadata.width)
  if (widths.length === 0) widths.push(metadata.width)

  const generated = []
  for (const width of widths) {
    for (const { ext, encode } of FORMATS) {
      const outputPath = path.join(outputDir, `${baseName}-${width}.${ext}`)
      const info = await encode(
        sharp(sourcePath).resize({ width, withoutEnlargement: true }),
      ).toFile(outputPath)
      generated.push({ width, ext, size: info.size })
      totalBytes += info.size
    }
  }

  // 用最大档的实际输出尺寸记录宽高比，供组件设置 width/height 防抖动。
  const largest = await sharp(
    path.join(outputDir, `${baseName}-${widths.at(-1)}.webp`),
  ).metadata()

  // 16px 宽的极小图内联为 data URI，作为加载完成前的模糊底色。
  const lqip = await sharp(sourcePath)
    .resize({ width: 16 })
    .webp({ quality: 20 })
    .toBuffer()

  manifest.push({
    name: baseName,
    widths,
    width: largest.width,
    height: largest.height,
    blur: `data:image/webp;base64,${lqip.toString('base64')}`,
  })

  const summary = generated
    .filter((g) => g.ext === 'webp')
    .map((g) => `${g.width}:${formatBytes(g.size)}`)
    .join('  ')
  console.log(`✓ ${baseName.padEnd(18)} ${metadata.width}x${metadata.height}  →  ${summary}`)
}

const entries = manifest
  .map(
    ({ name, widths, width, height, blur }) =>
      `  '${name}': {\n` +
      `    widths: [${widths.join(', ')}],\n` +
      `    width: ${width},\n` +
      `    height: ${height},\n` +
      `    blur: '${blur}',\n` +
      `  },`,
  )
  .join('\n')

await writeFile(
  path.join(root, 'src/data/images.ts'),
  `// 由 scripts/optimize-images.mjs 生成，请勿手改。

export type ResponsiveImage = {
  widths: readonly number[]
  width: number
  height: number
  blur: string
}

export const images = {
${entries}
} as const satisfies Record<string, ResponsiveImage>

export type ImageName = keyof typeof images
`,
)

console.log(`\n产物合计 ${formatBytes(totalBytes)}，已写入 src/data/images.ts`)

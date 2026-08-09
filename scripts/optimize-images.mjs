// 图片优化脚本：把原始大图转成适合 web 的 WebP。
//
// 尺寸依据：内容列最宽 576 CSS px，3x DPR 即 1728 物理像素；
// next.config.ts 的 deviceSizes 上限为 1920，所以 1728 已是能生成的最大变体。
//
// 用法：pnpm images:optimize [--force]
//   默认跳过已是最新的输出（源文件更新时间早于输出）。--force 全部重新编码。

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const force = process.argv.includes('--force')

/**
 * @type {Array<{
 *   name: string,
 *   from: string,
 *   to: string,
 *   width?: number,
 *   quality: number,
 *   manifest?: string,
 * }>}
 */
const jobs = [
  {
    // 样片：来源尺寸并不统一（2823x5016 / 2844x4977 / 3072x4608 等），
    // 只锁定宽度，高度按各自比例走。
    name: 'demo slides',
    from: 'public/2026-08-07',
    to: 'public/2026-08-07-webp',
    width: 1728,
    quality: 88,
    manifest: 'src/data/demo-slides.ts',
  },
  {
    // 落地页大图：走 next/image 静态导入，仅作为构建期源文件，
    // 保留原生分辨率，只换编码。
    name: 'landing assets',
    from: 'src/assets',
    to: 'src/assets',
    quality: 92,
  },
]

// 单独处理的文件：显示宽度只有 260 CSS px，原图 2560px 属于极度超采样。
const singles = [
  {
    name: 'daily headshots',
    from: 'public/daily-headshots.png',
    to: 'src/assets/daily-headshots.webp',
    width: 1536,
    quality: 90,
  },
]

const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

async function listSources(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort()
}

async function isUpToDate(sourcePath, outputPath) {
  if (force) return false
  try {
    const [source, output] = await Promise.all([stat(sourcePath), stat(outputPath)])
    return output.mtimeMs >= source.mtimeMs
  } catch {
    return false
  }
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

async function runJob(job) {
  const fromDir = path.join(root, job.from)
  const toDir = path.join(root, job.to)
  await mkdir(toDir, { recursive: true })

  const sources = await listSources(fromDir)
  if (sources.length === 0) {
    console.log(`\n${job.name}: 没有找到源文件，跳过`)
    return []
  }

  console.log(`\n${job.name}: ${sources.length} 个文件 (${job.from} → ${job.to})`)

  const results = []
  let sourceBytes = 0
  let outputBytes = 0

  for (const fileName of sources) {
    const sourcePath = path.join(fromDir, fileName)
    const baseName = path.basename(fileName, path.extname(fileName))
    const outputPath = path.join(toDir, `${baseName}.webp`)

    let pipeline = sharp(sourcePath)
    const metadata = await pipeline.metadata()

    // 只缩小，绝不放大。
    if (job.width && metadata.width > job.width) {
      pipeline = pipeline.resize({ width: job.width, withoutEnlargement: true })
    }

    if (await isUpToDate(sourcePath, outputPath)) {
      const [source, output] = await Promise.all([stat(sourcePath), stat(outputPath)])
      const existing = await sharp(outputPath).metadata()
      sourceBytes += source.size
      outputBytes += output.size
      results.push({ baseName, width: existing.width, height: existing.height })
      console.log(`  = ${baseName} (已是最新)`)
      continue
    }

    const info = await pipeline
      .webp({ quality: job.quality, effort: 6 })
      .toFile(outputPath)

    const source = await stat(sourcePath)
    sourceBytes += source.size
    outputBytes += info.size
    results.push({ baseName, width: info.width, height: info.height })

    console.log(
      `  ✓ ${baseName}  ${metadata.width}x${metadata.height} ${formatBytes(source.size)}` +
        ` → ${info.width}x${info.height} ${formatBytes(info.size)}`,
    )
  }

  console.log(`  ${job.name} 合计：${formatBytes(sourceBytes)} → ${formatBytes(outputBytes)}`)
  return results
}

async function writeSlideManifest(job, results) {
  const entries = results
    .map(
      ({ baseName, width, height }) =>
        `  { id: '${baseName}', src: '/${path.basename(job.to)}/${baseName}.webp', width: ${width}, height: ${height} },`,
    )
    .join('\n')

  const contents = `// 由 scripts/optimize-images.mjs 生成，请勿手改。
// 尺寸逐张记录：样片原始比例并不统一，写死单一尺寸会让预加载图变形。

export type DemoSlide = {
  id: string
  src: string
  width: number
  height: number
}

export const demoSlides: readonly DemoSlide[] = [
${entries}
]
`

  await writeFile(path.join(root, job.manifest), contents)
  console.log(`  → 已写入 ${job.manifest}`)
}

async function runSingle(single) {
  const sourcePath = path.join(root, single.from)
  const outputPath = path.join(root, single.to)

  try {
    await stat(sourcePath)
  } catch {
    console.log(`\n${single.name}: 源文件不存在，跳过 (${single.from})`)
    return
  }

  await mkdir(path.dirname(outputPath), { recursive: true })

  const pipeline = sharp(sourcePath)
  const metadata = await pipeline.metadata()
  const info = await pipeline
    .resize({ width: single.width, withoutEnlargement: true })
    .webp({ quality: single.quality, effort: 6 })
    .toFile(outputPath)

  const source = await stat(sourcePath)
  console.log(
    `\n${single.name}: ${metadata.width}x${metadata.height} ${formatBytes(source.size)}` +
      ` → ${info.width}x${info.height} ${formatBytes(info.size)}`,
  )
}

// 产物已是 .webp，不会被 landing assets 的批量任务重复处理。
for (const single of singles) {
  await runSingle(single)
}

for (const job of jobs) {
  const results = await runJob(job)
  if (job.manifest && results.length > 0) {
    await writeSlideManifest(job, results)
  }
}

console.log('\n完成。')

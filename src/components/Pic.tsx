import { images, type ImageName } from '@/data/images'

type PicProps = {
  name: ImageName
  alt: string
  className?: string
  revision?: string
  /** 默认按内容列（最宽 576px）取值，与 globals.css 的布局一致。 */
  sizes?: string
  /** 首屏图用；跳过懒加载并提高请求优先级。 */
  priority?: boolean
}

/**
 * 响应式图片。产物由 scripts/optimize-images.mjs 预生成，
 * 因此不依赖任何平台的运行时图片优化能力，可部署到纯静态托管。
 *
 * AVIF 在前、WebP 兜底：浏览器取第一个能解码的 source，
 * 老版本微信 X5 内核不支持 AVIF 时会自动回落到 WebP。
 */
export function Pic({
  name,
  alt,
  className,
  revision,
  sizes = '(max-width: 600px) 100vw, 576px',
  priority = false,
}: PicProps) {
  const { widths, width, height, blur } = images[name]

  const cacheSuffix = revision ? `?v=${revision}` : ''
  const srcSet = (ext: string) =>
    widths.map((w) => `/img/${name}-${w}.${ext}${cacheSuffix} ${w}w`).join(', ')

  return (
    // display: contents —— 让 picture 不参与布局，img 的表现与直接写 img 一致。
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${widths[0]}.webp${cacheSuffix}`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        // 加载完成前先铺一张 16px 的模糊图，避免黑底上突兀地跳出来。
        style={{
          backgroundImage: `url(${blur})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </picture>
  )
}

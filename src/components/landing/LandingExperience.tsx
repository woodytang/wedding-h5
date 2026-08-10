'use client'

import { useCallback, useEffect, useState } from 'react'
import { Pic } from '@/components/Pic'
import { demoSlides } from '@/data/demo-slides'

// 排序原则：把传统影楼与到店型 AI 服务做不到的排在前面。
// 这几类客户不是「选择」不去影楼，是去不了——属于增量而非争夺。
const suitableScenarios = [
  { title: '两人在异地，或一方在国外', detail: '不必等团聚，也能有一套合影' },
  { title: '婚礼已经办完，当年没顾上拍', detail: '什么时候想补都可以，不受时间限制' },
  { title: '孕期、病中，或实在请不出假', detail: '不用到场，在家就能完成' },
  { title: '传统婚纱照没拍好，想快速补拍', detail: '1–3 日交付，不必重新约档期和场地' },
  { title: '计划实景拍摄，想先试出方向', detail: '先用 AI 预演造型与场景，正式开拍不再试错' },
  { title: '想给父母、长辈补一套', detail: '那一代人很多没拍过，一张生活照就够' },
  { title: '不习惯面对镜头', detail: '没有影棚，没有围观，不用摆姿势' },
  { title: '想多试几种风格', detail: '换装换景不产生额外拍摄成本' },
]

export function LandingExperience() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSlideLoading, setIsSlideLoading] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const activeSlide = demoSlides[activeIndex]
  const adjacentSlides = [
    demoSlides[(activeIndex - 1 + demoSlides.length) % demoSlides.length],
    demoSlides[(activeIndex + 1) % demoSlides.length],
  ]

  const openDemo = useCallback(() => {
    setActiveIndex(0)
    setIsSlideLoading(true)
    setIsDemoOpen(true)
  }, [])
  const closeDemo = useCallback(() => setIsDemoOpen(false), [])
  const showPrevious = useCallback(() => {
    setIsSlideLoading(true)
    setActiveIndex((index) => (index - 1 + demoSlides.length) % demoSlides.length)
  }, [])
  const showNext = useCallback(() => {
    setIsSlideLoading(true)
    setActiveIndex((index) => (index + 1) % demoSlides.length)
  }, [])

  useEffect(() => {
    if (!isDemoOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDemo()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeDemo, isDemoOpen, showNext, showPrevious])

  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center overflow-x-clip bg-black">
      <article className="relative w-full max-w-[576px] leading-none">
        <Pic
          className="block h-auto w-full"
          name="landing-cover"
          alt="岚蝶AI影像婚礼高奢定制封面：浪漫没有标准答案。我们的尤其没有。"
          priority
        />
        <button
          className="demo-page-tab"
          type="button"
          aria-label="打开成片样片幻灯片"
          aria-haspopup="dialog"
          onClick={openDemo}
        >
          <span>看成片</span>
          <strong>DEMO</strong>
          <i>01-36</i>
          <b aria-hidden="true">›</b>
        </button>
      </article>

      <div className="flex w-full max-w-[576px] flex-col items-center bg-black px-6 pb-12 pt-12 text-center text-[#f8f4eb]">
        <p className="m-0 mb-1 text-[18px] font-medium tracking-[0.08em]">您唯一需要提供的：</p>
        <p className="m-0 mb-7 text-[11px] tracking-[0.08em] opacity-60">日常清晰生活照即可</p>
        <div className="relative inline-block origin-center bg-[#f5f1e8] p-2 pb-10 shadow-[0_14px_28px_-6px_rgba(0,0,0,0.6),0_6px_12px_-4px_rgba(0,0,0,0.4)] ring-1 ring-black/5 rotate-[-1.8deg] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.55),transparent_55%)] before:mix-blend-soft-light">
          <Pic
            className="block h-auto w-[55vw] max-w-[260px] ring-1 ring-black/15"
            name="daily-headshots"
            alt="日常照片头像示例"
            sizes="55vw"
          />
        </div>
        <p className="m-0 mt-10 text-[18px] font-medium tracking-[0.08em]">您得到的：</p>
      </div>
      <section className="relative w-full max-w-[576px] bg-black leading-none" id="section2" aria-label="婚礼高奢定制风格展示">
        <div className="flex w-full justify-center bg-black px-6">
          <Pic
            className="block h-auto w-full"
            name="land-image-3"
            alt=""
          />
        </div>
      </section>

      <section className="w-full max-w-[576px] bg-black px-6 pb-0 pt-10 text-[#f8f4eb]" aria-label="岚蝶AI影像服务特点">
        <ul className="m-0 list-none p-0">
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">01</span>
            <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">高定设计顾问 · 一对一服务</p>
          </li>
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">02</span>
            <div>
              <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">300种精品主题</p>
              <p className="m-0 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">或使用您的创意</p>
            </div>
          </li>
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">03</span>
            <div>
              <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">4K高清输出</p>
              <p className="m-0 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">婚礼可用 · 微信 / 抖音分享</p>
            </div>
          </li>
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">04</span>
            <div>
              <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">形象高保真还原</p>
              <p className="m-0 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">美可更美</p>
            </div>
          </li>
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">05</span>
            <div>
              <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">一张起做，多种套餐组合</p>
              <p className="m-0 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">不设最低起订数量</p>
            </div>
          </li>
          <li className="flex h-24 items-center gap-4 border-b border-[#b8b1a6]/25 last:border-b-0">
            <span className="text-[10px] tracking-[0.18em] text-[#b8b1a6]">06</span>
            <div>
              <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">1–3日可取</p>
              <p className="m-0 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">快速交付，安心使用</p>
            </div>
          </li>
        </ul>
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      <section className="relative w-full max-w-[576px] px-6 leading-none" id="section3" aria-label="日常照片定制婚纱照风格展示">
        <Pic
          className="block h-auto w-full"
          name="land-image-4"
          alt="岚蝶AI影像日常照片定制：西式经典、日韩时尚、中式典雅与港风怀旧婚纱照"
        />
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      <section className="relative w-full max-w-[576px] px-6 leading-none" aria-label="岚蝶AI影像婚礼影像展示">
        <Pic
          className="block h-auto w-full"
          name="land-image-5"
          alt="岚蝶AI影像婚礼影像展示"
        />
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      <section className="relative w-full max-w-[576px] px-6 leading-none" aria-label="岚蝶AI影像草地婚礼影像展示">
        <Pic
          className="block h-auto w-full"
          name="land-image-6"
          alt="岚蝶AI影像草地婚礼影像展示"
        />
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      <section className="relative w-full max-w-[576px] px-6 leading-none" aria-label="岚蝶AI影像后续婚礼影像展示">
        <Pic
          className="block h-auto w-full"
          name="land-image-7"
          alt="岚蝶AI影像后续婚礼影像展示"
        />
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      <section className="relative w-full max-w-[576px] px-6 leading-none" aria-label="岚蝶AI影像草地婚礼影像展示">
        <Pic
          className="block h-auto w-full"
          name="land-image-8"
          alt="岚蝶AI影像草地婚礼影像展示"
        />
      </section>

      <div className="flex w-full max-w-[576px] items-center gap-4 bg-black px-6 py-7 text-[#b8b1a6]" aria-label="岚蝶AI影像">
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
        <p className="m-0 shrink-0 text-[12px] font-light tracking-[0.2em]">岚蝶AI影像</p>
        <span className="h-px flex-1 bg-[#b8b1a6]/30" aria-hidden="true" />
      </div>

      {/*
        放在全部样片之后：客户已看完成片、认可质量，此时逐条读下来
        更容易对号入座。不用固定行高，条目文案长短不一会被裁掉。
      */}
      <section className="w-full max-w-[576px] bg-black px-6 pb-4 pt-2 text-[#f8f4eb]" aria-label="适合选择岚蝶AI影像的情况">
        <p className="m-0 mb-1 text-center text-[18px] font-medium tracking-[0.08em]">这些情况，特别适合</p>
        <p className="m-0 mb-8 text-center text-[11px] tracking-[0.08em] opacity-60">看看有没有说中您</p>
        <ul className="m-0 list-none p-0">
          {suitableScenarios.map((scenario, index) => (
            <li
              key={scenario.title}
              className="flex items-start gap-4 border-b border-[#b8b1a6]/25 py-5 last:border-b-0"
            >
              <span className="mt-1 shrink-0 text-[10px] tracking-[0.18em] text-[#b8b1a6]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="m-0 text-[14px] font-light leading-6 tracking-[0.08em]">{scenario.title}</p>
                <p className="m-0 mt-1 text-[12px] font-light leading-5 tracking-[0.08em] text-[#b8b1a6]">
                  {scenario.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/*
        工信部要求：使用中国大陆节点的网站需在首页底部展示 ICP 备案号，
        并链接到 beian.miit.gov.cn。会被抽查，不能省。
      */}
      <footer className="flex w-full max-w-[576px] flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-black px-6 pb-10 pt-6 text-[11px] font-light tracking-[0.12em] text-[#b8b1a6]/60">
        {/* 主体名称与备案登记的服务名称保持一致，避免抽查时被判定内容与备案不符 */}
        <span>数字时代的手艺人</span>
        <span aria-hidden="true">·</span>
        <a
          className="underline-offset-4 transition-colors hover:text-[#b8b1a6] hover:underline"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noreferrer"
        >
          沪ICP备2024087836号-1
        </a>
      </footer>

      <div className="demo-first-preload" aria-hidden="true">
        <img
          src={demoSlides[0].src}
          alt=""
          width={demoSlides[0].width}
          height={demoSlides[0].height}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {isDemoOpen && (
        <section className="demo-overlay" role="dialog" aria-modal="true" aria-label="岚蝶AI影像样片">
          <button className="demo-close" type="button" aria-label="关闭样片" onClick={closeDemo}>×</button>
          <button className="demo-nav demo-nav-previous" type="button" aria-label="上一张样片" onClick={showPrevious}>‹</button>

          <div
            className="demo-stage"
            onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
            onTouchEnd={(event) => {
              if (touchStart === null) return
              const distance = event.changedTouches[0].clientX - touchStart
              if (Math.abs(distance) > 42) (distance > 0 ? showPrevious : showNext)()
              setTouchStart(null)
            }}
          >
            <img
              key={activeSlide.id}
              src={activeSlide.src}
              alt={`岚蝶AI影像样片 ${activeIndex + 1}`}
              fetchPriority="high"
              decoding="async"
              onLoad={() => setIsSlideLoading(false)}
              onError={() => setIsSlideLoading(false)}
            />
            {isSlideLoading && <span className="demo-loading" aria-label="样片加载中" />}
            <p className="demo-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(demoSlides.length).padStart(2, '0')}</p>
          </div>

          <div className="demo-adjacent-preload" aria-hidden="true">
            {adjacentSlides.map((slide) => (
              <img
                key={slide.id}
                src={slide.src}
                alt=""
                width={slide.width}
                height={slide.height}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>

          <button className="demo-nav demo-nav-next" type="button" aria-label="下一张样片" onClick={showNext}>›</button>
        </section>
      )}
    </main>
  )
}

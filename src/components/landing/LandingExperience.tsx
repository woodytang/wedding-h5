'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Pic } from '@/components/Pic'
import { demoSlides } from '@/data/demo-slides'
import { albumThemes } from '@/data/album-themes'

// 这是「对号入座」板块，按自我识别的概率从高到低排，不按「只有我们能做」排——
// 后者是公司视角，访客只关心这条说的是不是自己，每错过一条就掉一批人。
//
// 01-05 普适的欲望与顾虑，几乎人人沾边；06-07 相当常见；
// 08-11 具体情境，命中率低但意图强。
//
// 开头用「想要多种场景」承接：读者刚滚过 37 张样片，正处在对场景的兴趣峰值上。
// 结尾用「给父母补一套」压轴：命中率最低但情感浓度最高，最易被转发。
const suitableScenarios = [
  { title: '想要多种场景', detail: '樱花、海边、夜景、教堂，不受季节与地理限制' },
  { title: '不想为拍照奔波', detail: '不挑天气，不挑档期，无需请假出行' },
  { title: '对当天状态没把握', detail: '气色、妆容、临场发挥，都不必赌' },
  { title: '想多试几套造型', detail: '换装不产生额外拍摄成本' },
  { title: '有明确的风格偏好', detail: '韩系、港风、中式典雅，300 种主题可选' },
  { title: '不习惯面对镜头', detail: '没有影棚，没有围观，不用摆姿势' },
  { title: '不想在几百张里挑废片', detail: '交付的每一张都是确认过的' },
  { title: '计划实景拍摄，想先试出方向', detail: '先用 AI 预演造型与场景，正式开拍不再试错' },
  { title: '传统婚纱照没拍好，想快速补拍', detail: '1–3 日交付，不必重新约档期和场地' },
  { title: '婚礼已经办完，当年没顾上拍', detail: '什么时候想补都可以，不受时间限制' },
  { title: '想给父母、长辈补一套', detail: '那一代人很多没拍过，一张生活照就够' },
]

function shuffleSlides(slides: readonly typeof demoSlides[number][]) {
  const shuffled = [...slides]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

export function LandingExperience() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [albumMode, setAlbumMode] = useState<'random' | 'theme'>('random')
  const [activeThemeId, setActiveThemeId] = useState('uncategorized')
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSlideLoading, setIsSlideLoading] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [randomSlides, setRandomSlides] = useState<readonly typeof demoSlides[number][]>(demoSlides)
  const activeTheme = albumThemes.find((theme) => theme.id === activeThemeId) || albumThemes[0]
  const activeSlides = albumMode === 'random' ? randomSlides : activeTheme.slides
  const activeSlide = activeSlides[activeIndex]
  const adjacentSlides = [
    activeSlides[(activeIndex - 1 + activeSlides.length) % activeSlides.length],
    activeSlides[(activeIndex + 1) % activeSlides.length],
  ].filter(Boolean)

  const openDemo = useCallback(() => {
    setRandomSlides(shuffleSlides(demoSlides))
    setAlbumMode('random')
    setActiveThemeId('uncategorized')
    setActiveIndex(0)
    setIsSlideLoading(true)
    setIsDemoOpen(true)
  }, [])
  const closeDemo = useCallback(() => setIsDemoOpen(false), [])
  const showPrevious = useCallback(() => {
    if (!activeSlides.length) return
    setIsSlideLoading(true)
    setActiveIndex((index) => (index - 1 + activeSlides.length) % activeSlides.length)
  }, [activeSlides.length])
  const showNext = useCallback(() => {
    if (!activeSlides.length) return
    setIsSlideLoading(true)
    if (albumMode === 'random') {
      setActiveIndex((index) => (index + 1) % activeSlides.length)
      return
    }
    if (activeIndex < activeSlides.length - 1) {
      setActiveIndex((index) => index + 1)
      return
    }
    const currentThemeIndex = albumThemes.findIndex((theme) => theme.id === activeThemeId)
    const nextTheme = albumThemes.slice(currentThemeIndex + 1).concat(albumThemes.slice(0, currentThemeIndex)).find((theme) => theme.slides.length)
    if (nextTheme) {
      setActiveThemeId(nextTheme.id)
      setActiveIndex(0)
    }
  }, [activeIndex, activeSlides.length, albumMode, activeThemeId])

  const selectTheme = useCallback((themeId: string) => {
    setAlbumMode('theme')
    setActiveThemeId(themeId)
    setActiveIndex(0)
    setIsSlideLoading(Boolean(albumThemes.find((theme) => theme.id === themeId)?.slides.length))
    setIsThemeDrawerOpen(false)
  }, [])

  const drawerThemes = useMemo(() => albumThemes, [])

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
          revision="20260811"
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

      {/*
        排在最后一张样片之前：前面已看过足够多成片建立信任，读完条目
        再以整图收尾，页面不至于结束在一列文字上。
        不用固定行高，条目文案长短不一会被裁掉。
      */}
      <section className="w-full max-w-[576px] bg-black px-6 pb-4 pt-2 text-[#f8f4eb]" aria-label="适合选择岚蝶AI影像的情况">
        <p className="m-0 mb-8 text-center text-[18px] font-medium tracking-[0.08em]">这些情况，特别适合</p>
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
            {activeSlide ? <img
              key={activeSlide.id}
              src={activeSlide.src}
              alt={`岚蝶AI影像样片 ${activeIndex + 1}`}
              fetchPriority="high"
              decoding="async"
              onLoad={() => setIsSlideLoading(false)}
              onError={() => setIsSlideLoading(false)}
            /> : <div className="album-empty-theme"><strong>{activeTheme.name}</strong><span>主题图片待添加</span></div>}
            {isSlideLoading && <span className="demo-loading" aria-label="样片加载中" />}
            {activeSlide && <p className="demo-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}</p>}
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

          <div className="album-controls" aria-label="相册模式和主题">
            <button type="button" className={albumMode === 'random' ? 'active' : ''} onClick={() => { setAlbumMode('random'); setActiveIndex(0); setIsSlideLoading(true) }}>全局随机</button>
            <button type="button" className={albumMode === 'theme' ? 'active' : ''} onClick={() => setIsThemeDrawerOpen(true)}>主题模式</button>
          </div>

          {isThemeDrawerOpen && <aside className="theme-drawer" aria-label="主题列表">
            <div className="theme-drawer-head"><strong>选择主题</strong><button type="button" onClick={() => setIsThemeDrawerOpen(false)} aria-label="关闭主题列表">×</button></div>
            <div className="theme-drawer-list">
              {drawerThemes.map((theme) => <button type="button" className={`theme-drawer-item ${theme.id === activeThemeId ? 'selected' : ''}`} key={theme.id} onClick={() => selectTheme(theme.id)}>
                <span className="theme-thumb">{theme.cover ? <img src={theme.cover.src} alt="" /> : <span>待添加</span>}</span>
                <span><strong>{theme.name}</strong><small>{theme.description}</small></span>
              </button>)}
            </div>
          </aside>}

          <button className="demo-nav demo-nav-next" type="button" aria-label="下一张样片" onClick={showNext}>›</button>
        </section>
      )}
    </main>
  )
}

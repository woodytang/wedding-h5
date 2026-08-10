// 手工维护。样片最初由脚本批量生成，母片已不在仓库中，
// 之后换图需同步更新此处的尺寸。
//
// 尺寸逐张记录：各样片比例并不统一（0.5625 / 0.6667 等），
// 写死单一尺寸会让预加载图变形。

export type DemoSlide = {
  id: string
  src: string
  width: number
  height: number
}

export const demoSlides: readonly DemoSlide[] = [
  { id: 'LAB01-S01', src: '/2026-08-07-webp/LAB01-S01.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S02', src: '/2026-08-07-webp/LAB01-S02.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S03', src: '/2026-08-07-webp/LAB01-S03.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S04', src: '/2026-08-07-webp/LAB01-S04.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S05', src: '/2026-08-07-webp/LAB01-S05.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S06', src: '/2026-08-07-webp/LAB01-S06.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S07', src: '/2026-08-07-webp/LAB01-S07.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S08', src: '/2026-08-07-webp/LAB01-S08.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S09', src: '/2026-08-07-webp/LAB01-S09.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S10', src: '/2026-08-07-webp/LAB01-S10.webp', width: 1125, height: 2000 },
  { id: 'LAB01-S11', src: '/2026-08-07-webp/LAB01-S11.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S12', src: '/2026-08-07-webp/LAB01-S12.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S13', src: '/2026-08-07-webp/LAB01-S13.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S14', src: '/2026-08-07-webp/LAB01-S14.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S15', src: '/2026-08-07-webp/LAB01-S15.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S16', src: '/2026-08-07-webp/LAB01-S16.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S17', src: '/2026-08-07-webp/LAB01-S17.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S18', src: '/2026-08-07-webp/LAB01-S18.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S19', src: '/2026-08-07-webp/LAB01-S19.webp', width: 1728, height: 3074 },
  { id: 'LAB01-S20', src: '/2026-08-07-webp/LAB01-S20.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S21', src: '/2026-08-07-webp/LAB01-S21.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S22', src: '/2026-08-07-webp/LAB01-S22.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S23', src: '/2026-08-07-webp/LAB01-S23.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S24', src: '/2026-08-07-webp/LAB01-S24.webp', width: 1728, height: 3070 },
  { id: 'LAB01-S25', src: '/2026-08-07-webp/LAB01-S25.webp', width: 1728, height: 3070 },
  { id: 'NW02-S01', src: '/2026-08-07-webp/NW02-S01.webp', width: 1728, height: 2592 },
  { id: 'NW04-S06', src: '/2026-08-07-webp/NW04-S06.webp', width: 1728, height: 3024 },
  { id: 'OR04-S01', src: '/2026-08-07-webp/OR04-S01.webp', width: 1728, height: 3024 },
  { id: 'OR04-S02', src: '/2026-08-07-webp/OR04-S02.webp', width: 1728, height: 3024 },
  { id: 'ST01-S01', src: '/2026-08-07-webp/ST01-S01.webp', width: 1728, height: 3026 },
  { id: 'ST01-S02', src: '/2026-08-07-webp/ST01-S02.webp', width: 1728, height: 3024 },
  { id: 'ST01-S04', src: '/2026-08-07-webp/ST01-S04.webp', width: 1728, height: 2592 },
  { id: 'ST01-S05', src: '/2026-08-07-webp/ST01-S05.webp', width: 1728, height: 3024 },
  { id: 'ST01-S09', src: '/2026-08-07-webp/ST01-S09.webp', width: 1728, height: 3024 },
  { id: 'ST02-S09', src: '/2026-08-07-webp/ST02-S09.webp', width: 1728, height: 2592 },
  { id: 'ST04-S08', src: '/2026-08-07-webp/ST04-S08.webp', width: 1728, height: 2592 },
  { id: 'ST04-S11', src: '/2026-08-07-webp/ST04-S11.webp', width: 1728, height: 2592 },
]
